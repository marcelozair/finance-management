import { useEffect, useState } from "react";
import { TbFilterPlus, TbTableExport, TbTableImport } from "react-icons/tb";

import { Flex, Heading } from "@chakra-ui/react";
import { TransactionCard } from "./Transaction/Transaction";
import { useWalletStore } from "../../store/useWalletStore";
import { WalletDomain } from "src/modules/wallet/application";
import { NoTransactions } from "./NoTransactions/NoTransactions";
import { useTransactionStore } from "../../store/useTransactionStore";
import { TransactionCardSkeleton } from "./Transaction/TransactionSkeleton";
import { useExecuteUseCase } from "@shared/presentation/hooks/useExecuteUseCase";
import { CreateTransactionModal } from "./CreateTransaction/CreateTransactionModal";
import { CreateTransactionButton } from "./CreateTransaction/CreateTransactionButton";

interface GetAllTransactionParams {
  walletId: number;
}

export const WalletTransactions = () => {
  const domain = new WalletDomain();

  const { selectedWalletId } = useWalletStore();
  const { transactions, setTransactions } = useTransactionStore();

  const [transactionModal, setTransactionModal] = useState(false);

  const { loading, execute } = useExecuteUseCase<void, GetAllTransactionParams>(
    {
      callback: async (params: GetAllTransactionParams): Promise<void> => {
        const transactions = await domain.getAllTransactions(params.walletId);

        setTransactions(transactions);
      },
    },
  );

  useEffect(() => {
    if (selectedWalletId) {
      execute({
        walletId: selectedWalletId,
      });
    }
  }, [selectedWalletId]);

  return (
    <div>
      <CreateTransactionModal
        isOpen={transactionModal}
        onClose={() => setTransactionModal(false)}
      />
      <Flex justifyContent="space-between" alignItems="center" mb={5}>
        <Heading size="xl">Wallet Transactions</Heading>
        <Flex gap={5}>
          <TbFilterPlus size={20} />
          <TbTableExport size={20} />
          <TbTableImport size={20} />
        </Flex>
      </Flex>

      {!!transactions.length && (
        <CreateTransactionButton onClick={() => setTransactionModal(true)} />
      )}

      {loading && (
        <Flex flexDirection="column" mt={5}>
          <TransactionCardSkeleton />
          <TransactionCardSkeleton />
          <TransactionCardSkeleton />
          <TransactionCardSkeleton />
          <TransactionCardSkeleton />
          <TransactionCardSkeleton />
        </Flex>
      )}

      {!transactions.length && !loading && (
        <NoTransactions openModal={() => setTransactionModal(true)} />
      )}
      {transactions.length > 0 && (
        <Flex flexDirection="column" mt={5}>
          {transactions.map((transaction) => (
            <TransactionCard key={transaction._id} transaction={transaction} />
          ))}
        </Flex>
      )}
    </div>
  );
};
