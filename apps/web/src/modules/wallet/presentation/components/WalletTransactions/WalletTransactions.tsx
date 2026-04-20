import { useEffect, useState } from "react";
import { TbFilterPlus, TbTableExport, TbTableImport } from "react-icons/tb";

import { Flex, Heading, Text } from "@chakra-ui/react";
import { formatPrettyDate } from "@shared/utils/dates";
import { TransactionCard } from "./Transaction/Transaction";
import { useWalletStore } from "../../store/useWalletStore";
import { useWalletDomain } from "../../hooks/useWalletDomain";
import { NoTransactions } from "./NoTransactions/NoTransactions";
import { useTransactionStore } from "../../store/useTransactionStore";
import { TransactionCardSkeleton } from "./Transaction/TransactionSkeleton";
import { useExecuteUseCase } from "@shared/presentation/hooks/useExecuteUseCase";
import { CreateTransactionModal } from "./CreateTransaction/CreateTransactionModal";
import { CreateTransactionButton } from "./CreateTransaction/CreateTransactionButton";
import { useConfig } from "@shared/presentation/store/appConfig/useAppConfig";

interface GetAllTransactionParams {
  walletId: number;
}

export const WalletTransactions = () => {
  const config = useConfig();
  const domain = useWalletDomain();
  const { selectedWalletId } = useWalletStore();
  const { transactionsByDate, setTransactions } = useTransactionStore();

  const [transactionModal, setTransactionModal] = useState(false);

  const { loading, execute } = useExecuteUseCase<void, GetAllTransactionParams>(
    {
      callback: async (params: GetAllTransactionParams): Promise<void> => {
        const response = await domain.getAllTransactions(params.walletId);
        setTransactions(response.dates);
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

      {!!transactionsByDate.length && (
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

      {!transactionsByDate.length && !loading && (
        <NoTransactions openModal={() => setTransactionModal(true)} />
      )}
      {transactionsByDate.length > 0 && (
        <Flex flexDirection="column" mt={5}>
          {transactionsByDate.map((group) => (
            <>
              <Text p="14px 16px" fontSize="sm" color="gray.500">
                {formatPrettyDate(group.date, config.system.lang)}
              </Text>
              {group.transactions.map((transaction) => (
                <TransactionCard
                  key={transaction._id}
                  transaction={transaction}
                />
              ))}
            </>
          ))}
        </Flex>
      )}
    </div>
  );
};
