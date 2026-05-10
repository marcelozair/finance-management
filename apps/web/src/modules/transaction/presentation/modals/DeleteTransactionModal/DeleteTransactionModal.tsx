import { Button, Flex } from "@chakra-ui/react";
import { Modal } from "@shared/presentation/components/Modal/Modal";
import { useTransactionStore } from "../../store/useTransactionStore";
import { useTransactionDomain } from "../../hooks/useTransactionDomain";
import { useWalletStore } from "@modules/wallet/presentation/store/useWalletStore";
import { useExecuteUseCase } from "@shared/presentation/hooks/useExecuteUseCase";

interface DeleteTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteTransactionModal = ({
  onClose,
  isOpen,
}: DeleteTransactionModalProps) => {
  const domain = useTransactionDomain();

  const { selectedWallet, updateWallets } = useWalletStore();
  const { selectedTransaction, deleteTransaction } = useTransactionStore();

  const { execute, loading } = useExecuteUseCase<void, void>({
    callback: async () => {
      try {
        if (selectedWallet && selectedWallet._id && selectedTransaction) {
          await domain.deleteTransaction(
            selectedWallet._id,
            selectedTransaction._id,
          );

          updateWallets(selectedTransaction, "remove");
          deleteTransaction(selectedTransaction._id);
        }
      } finally {
        onClose();
      }
    },
  });

  const handleDelete = () => {
    execute();
  };

  return (
    <Modal
      size="sm"
      isOpen={isOpen}
      title="Delete Transaction"
      body={
        <Flex direction="column" gap={4}>
          <p>Are you sure you want to delete this transaction?</p>
        </Flex>
      }
      footer={
        <Flex gap={4}>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            bg="red.500"
            color="white"
            loading={loading}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Flex>
      }
    />
  );
};
