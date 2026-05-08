import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button, Flex, createListCollection } from "@chakra-ui/react";
import { TiArrowRepeat, TiChartArea, TiChartLine } from "react-icons/ti";

import {
  createTransactionSchema,
  type CreateTransactionForm,
} from "./ValidationForm";

import { Currency } from "@core/domain/vo/Currency";
import { yupResolver } from "@hookform/resolvers/yup";
import { CategorySelect } from "./CategorySelect/CategorySelect";
import { Modal } from "@shared/presentation/components/Modal/Modal";
import { useTransactionStore } from "../../store/useTransactionStore";
import { useTransactionDomain } from "../../hooks/useTransactionDomain";
import { TransactionEnum } from "./CategorySelect/TransactionCatalogs";
import { TransactionType } from "./TransactionTypeSelect/TransactionType";
import { TextField } from "@shared/presentation/components/TextField/TextField";
import { DateField } from "@shared/presentation/components/DateField/DateField";
import { useExecuteUseCase } from "@shared/presentation/hooks/useExecuteUseCase";
import { AmountField } from "@shared/presentation/components/AmountField/AmountField";
import { SelectField } from "@shared/presentation/components/SelectField/SelectField";
import { useWalletStore } from "../../../../wallet/presentation/store/useWalletStore";
import type { CreateTransactionDto } from "@modules/transaction/domain/interfaces/CreateTransactionDto";

interface CreateTransactionModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export const CreateTransactionModal = ({
  onClose,
  isOpen,
}: CreateTransactionModalProps) => {
  const domain = useTransactionDomain();

  const [walletsCatalog, setWalletsCatalog] = useState(
    createListCollection<{ label: string; value: string }>({
      items: [],
    }),
  );

  const { addTransaction, categories, setCategories } = useTransactionStore();
  const { wallets, selectedWallet, updateWallets } = useWalletStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<CreateTransactionForm>({
    mode: "onChange",
    resolver: yupResolver(createTransactionSchema),
  });

  const transactionType = watch("type");

  const { execute, loading } = useExecuteUseCase<void, CreateTransactionDto>({
    callback: async (transaction: CreateTransactionDto) => {
      try {
        if (selectedWallet && selectedWallet._id) {
          const createdTransaction = await domain.createTransaction(
            selectedWallet._id,
            transaction,
          );

          addTransaction(createdTransaction);
          updateWallets(createdTransaction);
        }
      } finally {
        handleClose();
      }
    },
  });

  const setTransactionType = (transactionType: string) => {
    setValue("type", transactionType);
  };

  const onSubmit = (data: CreateTransactionForm) => {
    const isoDate = new Date(data.date).toISOString();
    const payload: CreateTransactionDto = {
      amount: data.amount,
      type: data.type,
      categoryId: data.categoryId,
      subCategoryId: data.subCategoryId,
      date: isoDate,
      concept: data.concept,
      destinationWalletId: data.destinationWalletId,
    };

    execute(payload);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    const catalogItems = wallets.map((wallet) => ({
      label: wallet._name,
      value: wallet._id.toString(),
    }));

    setWalletsCatalog(createListCollection({ items: catalogItems }));
  }, [wallets]);

  useEffect(() => {
    if (isOpen && categories.length === 0) {
      domain.getCategories().then(setCategories).catch(console.error);
    }
  }, [isOpen, categories.length, domain, setCategories]);

  return (
    <Modal
      size="sm"
      isOpen={isOpen}
      title="Create Transaction"
      body={
        <form id="create-transaction-form" onSubmit={handleSubmit(onSubmit)}>
          <Flex gap={4} flexDirection="column">
            <Flex justifyContent={"space-between"} gap={2}>
              <TransactionType
                active={transactionType === TransactionEnum.INCOME}
                Icon={TiChartLine}
                label="Income"
                color="green"
                onClick={() => setTransactionType(TransactionEnum.INCOME)}
              />
              <TransactionType
                active={transactionType === TransactionEnum.EXPENSE}
                Icon={TiChartArea}
                label="Expense"
                color="red"
                onClick={() => setTransactionType(TransactionEnum.EXPENSE)}
              />
              <TransactionType
                active={transactionType === TransactionEnum.TRANSFER}
                Icon={TiArrowRepeat}
                label="Transfer"
                color="blue"
                onClick={() => setTransactionType(TransactionEnum.TRANSFER)}
              />
            </Flex>
            <TextField
              label="Concept"
              placeholder="Enter concept details"
              error={errors.concept?.message}
              {...register("concept")}
            />

            <CategorySelect
              categories={categories}
              error={
                errors.categoryId?.message || errors.subCategoryId?.message
              }
              value={
                watch("categoryId") && watch("subCategoryId")
                  ? [
                      JSON.stringify({
                        categoryId: watch("categoryId"),
                        subCategoryId: watch("subCategoryId"),
                      }),
                    ]
                  : []
              }
              onValueChange={(details) => {
                if (details.value.length > 0) {
                  const parsed = JSON.parse(details.value[0]);
                  setValue("categoryId", parsed.categoryId, {
                    shouldValidate: true,
                  });
                  setValue("subCategoryId", parsed.subCategoryId, {
                    shouldValidate: true,
                  });
                }
              }}
            />
            {transactionType === TransactionEnum.TRANSFER && (
              <SelectField
                label="Destination Wallet"
                placeholder="Select destination wallet"
                options={walletsCatalog}
                error={errors.destinationWalletId?.message}
                onSelect={(value: string) =>
                  setValue("destinationWalletId", parseInt(value), {
                    shouldValidate: true,
                  })
                }
              />
            )}
            <AmountField
              label="Amount"
              placeholder="Enter an amount"
              error={errors.amount?.message}
              currency={selectedWallet?._currency || new Currency("USD")}
              {...register("amount")}
            />
            <DateField
              onChange={(value: string) => setValue("date", value)}
              error={errors.date?.message}
            />
          </Flex>
        </form>
      }
      footer={
        <Flex gap={4}>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-transaction-form"
            loading={loading}
            disabled={!isValid}
          >
            Save
          </Button>
        </Flex>
      }
    />
  );
};
