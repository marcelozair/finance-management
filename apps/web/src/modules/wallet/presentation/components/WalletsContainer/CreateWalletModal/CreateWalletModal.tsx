import { Button, createListCollection, Flex } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { AmountField } from "@shared/presentation/components/AmountField/AmountField";
import { Modal } from "@shared/presentation/components/Modal/Modal";
import { SelectField } from "@shared/presentation/components/SelectField/SelectField";
import { TextField } from "@shared/presentation/components/TextField/TextField";
import { useExecuteUseCase } from "@shared/presentation/hooks/useExecuteUseCase";
import { CurrencyEnum } from "src/core/const/currencyEnum";
import { WalletDomain } from "src/modules/wallet/application";
import type { CreateWalletDto } from "src/modules/wallet/application/dtos/CreateWalletDto";
import type { Wallet } from "src/modules/wallet/domain/entities/Wallet";
import { useWalletStore } from "../../../store/useWalletStore";
import { useProfile } from "src/shared/presentation/store/profile/useProfile";

const accountTypesCatalog = createListCollection({
  items: [
    { label: "Cash", value: "Cash" },
    { label: "Debit Wallet", value: "Debit Wallet" },
    { label: "Save Wallet", value: "Save Wallet" },
  ],
});

const currenciesCatalog = createListCollection({
  items: Object.values(CurrencyEnum).map((currency) => ({
    value: currency as string,
    label: currency as string,
  })),
});

const createWalletSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  initialBalance: yup
    .number()
    .typeError("Balance must be a number")
    .required("Initial balance is required"),
  walletType: yup.string().required("Account type is required"),
  currency: yup.string().required("Currency is required"),
});

interface CreateWalletForm {
  name: string;
  initialBalance: number;
  walletType: string;
  currency: string;
}

interface CreateWalletModalProps {
  onClose: () => void;
  isOpen?: boolean;
}

export const CreateWalletModal = ({
  onClose,
  isOpen,
}: CreateWalletModalProps) => {
  const walletDomain = new WalletDomain();

  const { addWallet } = useWalletStore();
  const { profile } = useProfile();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm<CreateWalletForm>({
    mode: "onChange",
    resolver: yupResolver(createWalletSchema),
  });

  const { execute, loading } = useExecuteUseCase<
    Wallet,
    { profileId: number; payload: CreateWalletDto }
  >({
    callback: walletDomain.createWallet.bind(walletDomain),
  });

  const onSubmit = async (data: CreateWalletForm) => {
    if (!profile) return;

    const payload: CreateWalletDto = {
      ...data,
      color: "#4A5568",
    };

    const newWallet = await execute({ profileId: profile.id, payload });
    if (newWallet) {
      addWallet(newWallet);
      reset();
      onClose();
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      size="sm"
      isOpen={isOpen}
      title="Create Wallet"
      body={
        <form id="create-wallet-form" onSubmit={handleSubmit(onSubmit)}>
          <Flex gap={4} flexDirection="column">
            <TextField
              label="Wallet Name"
              placeholder="Enter wallet name"
              error={errors.name?.message}
              {...register("name")}
            />
            <AmountField
              label="Initial Balance"
              placeholder="Enter initial balance"
              error={errors.initialBalance?.message}
              {...register("initialBalance")}
            />
            <SelectField
              label="Account Type"
              placeholder="Select account type"
              options={accountTypesCatalog}
              error={errors.walletType?.message}
              onSelect={(value: string) =>
                setValue("walletType", value, { shouldValidate: true })
              }
            />
            <SelectField
              label="Currency"
              placeholder="Select currency"
              options={currenciesCatalog}
              error={errors.currency?.message}
              onSelect={(value: string) =>
                setValue("currency", value, { shouldValidate: true })
              }
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
            form="create-wallet-form"
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
