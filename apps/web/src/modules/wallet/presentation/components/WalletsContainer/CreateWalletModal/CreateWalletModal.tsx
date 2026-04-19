import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, createListCollection, Flex } from "@chakra-ui/react";

import { CurrencyConfig } from "src/core/const/currencyEnum";
import { WalletDomain } from "src/modules/wallet/application";
import { useWalletStore } from "../../../store/useWalletStore";
import { Modal } from "@shared/presentation/components/Modal/Modal";
import { useProfile } from "src/shared/presentation/store/profile/useProfile";
import { TextField } from "@shared/presentation/components/TextField/TextField";
import { useExecuteUseCase } from "@shared/presentation/hooks/useExecuteUseCase";
import { AmountField } from "@shared/presentation/components/AmountField/AmountField";
import { SelectField } from "@shared/presentation/components/SelectField/SelectField";
import type { CreateWalletDto } from "src/modules/wallet/application/dtos/CreateWalletDto";

enum WalletTypes {
  SAVE = "Save",
  CREDIT = "Credit",
  DEBIT = "Debit",
  CASH = "Cash",
}

const accountTypesCatalog = createListCollection({
  items: [
    { label: "Cash", value: WalletTypes.CASH as string },
    { label: "Save", value: WalletTypes.SAVE as string },
    { label: "Debit", value: WalletTypes.DEBIT as string },
    { label: "Credit", value: WalletTypes.CREDIT as string },
  ],
});

const currenciesCatalog = createListCollection({
  items: Object.values(CurrencyConfig).map((currency) => ({
    value: currency.currency,
    label: currency.label,
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

  const { addWallet, selectWallet, selectWalletId } = useWalletStore();
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

  const { execute, loading } = useExecuteUseCase<void, CreateWalletDto>({
    callback: async (payload) => {
      try {
        if (profile) {
          const wallet = await walletDomain.createWallet(profile.id, payload);
          addWallet(wallet);
          selectWallet(wallet);
          selectWalletId(wallet._id);
        }
      } finally {
        reset();
        onClose();
      }
    },
  });

  const onSubmit = async (data: CreateWalletForm) => {
    if (!profile) return;

    const payload: CreateWalletDto = {
      ...data,
      color: "#4A5568",
    };

    execute(payload);
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
