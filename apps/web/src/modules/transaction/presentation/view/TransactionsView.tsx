import { useModal } from "@shared/presentation/hooks/useModal";
import { TransactionHeader, TransactionTable } from "../layout";
import { CreateTransactionModal } from "../modals/CreateTransactionModal/CreateTransactionModal";

export const TransactionsView = () => {
  const { close, isOpen, open } = useModal();

  return (
    <section>
      <CreateTransactionModal isOpen={isOpen} onClose={close} />
      <TransactionHeader />
      <TransactionTable openModal={open} />
    </section>
  );
};
