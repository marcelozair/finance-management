import { Fragment, useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";

import { formatPrettyDate } from "@shared/utils/dates";
import { useTransactionStore } from "../store/useTransactionStore";
import { useTransactionDomain } from "../hooks/useTransactionDomain";
import { WalletTypes } from "@modules/wallet/domain/entities/Wallet";
import { CreateTransactionButton, NoTransactionsTable } from "../components";
import { useConfig } from "@shared/presentation/store/appConfig/useAppConfig";
import { TransactionCard } from "../components/TransactionCard/TransactionCard";
import { useExecuteUseCase } from "@shared/presentation/hooks/useExecuteUseCase";
import { useWalletStore } from "@modules/wallet/presentation/store/useWalletStore";
import { TransactionCardSkeleton } from "../components/TransactionCard/TransactionCardSkeleton";
import { TransactionsPagination } from "../components/TransactionPagination/TransactionsPagination";
import { CreditCardInfo } from "@modules/wallet/presentation/components/WalletsContainer/WalletInfo/WalletInfo";

export interface TransactionTable {
  openModal: () => void;
}

export const TransactionTable = ({ openModal }: TransactionTable) => {
  const {
    pagination,
    updatePagination,
    transactionsByDate,
    updateTransactions,
    selectedTransaction,
  } = useTransactionStore();
  const config = useConfig();
  const { selectedWallet } = useWalletStore();
  const transactionDomain = useTransactionDomain();

  const { loading, execute } = useExecuteUseCase<void, void>({
    callback: async (): Promise<void> => {
      if (selectedWallet?._id) {
        const response = await transactionDomain.getAllTransactions(
          selectedWallet._id,
          pagination.currentPage,
          pagination.pageSize,
        );
        // #TODO Refactor | create update Jotai Methods
        updateTransactions(response.dates);
        updatePagination({
          ...pagination,
          total: response.metadata.total,
          nextPage: response.metadata.nextPage,
          prevPage: response.metadata.prevPage,
        });
      }
    },
  });

  useEffect(() => {
    if (selectedWallet) execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWallet]);

  return (
    <>
      {selectedWallet && selectedWallet._type === WalletTypes.CREDIT && (
        <CreditCardInfo
          creditLine={selectedWallet._creditLine}
          balance={selectedWallet._balance.abs()}
        />
      )}

      {!!transactionsByDate.length && (
        <CreateTransactionButton onClick={openModal} />
      )}

      {loading && (
        <Flex flexDirection="column" mt={5}>
          {new Array(8).fill(null).map(() => (
            <TransactionCardSkeleton />
          ))}
        </Flex>
      )}

      {!transactionsByDate.length && !loading && (
        <NoTransactionsTable openModal={openModal} />
      )}

      {transactionsByDate.length > 0 && (
        <Flex flexDirection="column" mt={5}>
          {transactionsByDate.map((group) => (
            <Fragment key={group.date}>
              <Text p="14px 16px" fontSize="sm" color="gray.500">
                {formatPrettyDate(group.date, config.system.lang)}
              </Text>
              {group.transactions.map((transaction) => (
                <TransactionCard
                  selected={selectedTransaction?._id === transaction._id}
                  key={transaction._id}
                  transaction={transaction}
                />
              ))}
            </Fragment>
          ))}
        </Flex>
      )}
      <TransactionsPagination />
    </>
  );
};
