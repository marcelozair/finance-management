import { Button, createListCollection, Flex } from "@chakra-ui/react";
import { AmountField } from "@shared/presentation/components/AmountField/AmountField";
import { Modal } from "@shared/presentation/components/Modal/Modal";
import { SelectField } from "@shared/presentation/components/SelectField/SelectField";
import { TextField } from "@shared/presentation/components/TextField/TextField";

const accountTypesCatalog = createListCollection({
  items: [
    { label: "Cash", value: "cash" },
    { label: "Debit card", value: "debit" },
    { label: "Credit card", value: "credit" },
    { label: "Saving account", value: "saving" },
  ],
});

interface CreateWalletModalProps {
  onClose: () => void;
  isOpen?: boolean;
}

export const CreateWalletModal = ({
  onClose,
  isOpen,
}: CreateWalletModalProps) => {
  return (
    <Modal
      size="sm"
      isOpen={isOpen}
      title="Create Wallet"
      body={
        <Flex gap={4} flexDirection="column">
          <TextField label="Wallet Name" placeholder="Enter wallet name" />
          <AmountField
            label="Initial Balance"
            placeholder="Enter wallet name"
          />
          <SelectField
            label="Account Type"
            placeholder="Select account type"
            options={accountTypesCatalog}
          />
        </Flex>
      }
      footer={
        <Flex gap={4}>
          <Button variant={"outline"} onClick={onClose}>
            Cancel
          </Button>
          <Button>Save</Button>
        </Flex>
      }
    />
  );
};
