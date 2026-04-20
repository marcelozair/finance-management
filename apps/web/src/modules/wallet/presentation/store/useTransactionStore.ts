import { useAtom } from "jotai";

import type { Transaction } from "../../domain/entities/Transaction";
import { transactionsByDateAtom, transactionStore } from "./transactionStore";
import type { TransactionsByDate } from "../../domain/interfaces/TransactionRepositoryDtos";

interface UseTransactionStore {
  transactionsByDate: TransactionsByDate[];
  addTransaction: (transaction: Transaction) => void;
  setTransactions: (grouped: TransactionsByDate[]) => void;
}

export const useTransactionStore = (): UseTransactionStore => {
  const [transactionsByDate, setTransactions] = useAtom(
    transactionsByDateAtom,
    {
      store: transactionStore,
    },
  );

  const addTransaction = (transaction: Transaction) => {
    // setTransactions((prev) => [...prev, transaction]);
  };

  // const addWallet = (wallet: Wallet) => {
  //   setWalletsAtom((prev) => [...prev, wallet]);
  // };

  return {
    transactionsByDate,
    addTransaction,
    setTransactions: (grouped: TransactionsByDate[]) =>
      setTransactions(grouped),
    // setWallets,
    // addWallet,
    // selectWallet,
    // selectedWalletId,
  };
};
