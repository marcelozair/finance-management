import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, createListCollection, Flex } from "@chakra-ui/react";

import {
  TransactionEnum,
  transactionTypeCatalog,
  transactionCategoriesCatalog,
} from "./TransactionCatalogs";
import {
  createTransactionSchema,
  type CreateTransactionForm,
} from "./ValidationForm";

import { useWalletStore } from "../../../store/useWalletStore";
import { useWalletDomain } from "../../../hooks/useWalletDomain";
import { Modal } from "@shared/presentation/components/Modal/Modal";
import { TextField } from "@shared/presentation/components/TextField/TextField";
import { useExecuteUseCase } from "@shared/presentation/hooks/useExecuteUseCase";
import { AmountField } from "@shared/presentation/components/AmountField/AmountField";
import { SelectField } from "@shared/presentation/components/SelectField/SelectField";
import type { CreateTransactionDto } from "src/modules/wallet/application/dtos/CreateTransactionDto";
import { useTransactionStore } from "../../../store/useTransactionStore";

interface CreateTransactionModalProps {
  onClose: () => void;
  isOpen?: boolean;
}

export const CreateTransactionModal = ({
  onClose,
  isOpen,
}: CreateTransactionModalProps) => {
  const domain = useWalletDomain();

  const [walletsCatalog, setWalletsCatalog] = useState(
    createListCollection<{ label: string; value: string }>({
      items: [],
    }),
  );

  const { addTransaction } = useTransactionStore();
  const { wallets, selectedWalletId, updateWallets } = useWalletStore();

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

  const { execute, loading } = useExecuteUseCase<void, CreateTransactionDto>({
    callback: async (transaction: CreateTransactionDto) => {
      try {
        if (selectedWalletId) {
          const createdTransaction = await domain.createTransaction(
            selectedWalletId,
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

  const onSubmit = (data: CreateTransactionForm) => {
    const payload: CreateTransactionDto = {
      amount: data.amount,
      type: data.type,
      category: data.category,
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

  return (
    <Modal
      size="sm"
      isOpen={isOpen}
      title="Create Transaction"
      body={
        <form id="create-transaction-form" onSubmit={handleSubmit(onSubmit)}>
          <Flex gap={4} flexDirection="column">
            <TextField
              label="Concept"
              placeholder="Enter concept details"
              error={errors.concept?.message}
              {...register("concept")}
            />
            <AmountField
              label="Amount"
              placeholder="Enter an amount"
              error={errors.amount?.message}
              {...register("amount")}
            />
            <SelectField
              label="Type"
              placeholder="Select transaction type"
              options={transactionTypeCatalog}
              error={errors.type?.message}
              onSelect={(value: string) =>
                setValue("type", value, { shouldValidate: true })
              }
            />
            <SelectField
              label="Category"
              placeholder="Select transaction category"
              options={transactionCategoriesCatalog}
              error={errors.category?.message}
              onSelect={(value: string) =>
                setValue("category", value, { shouldValidate: true })
              }
            />
            {watch("type") === TransactionEnum.TRANSFER && (
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
