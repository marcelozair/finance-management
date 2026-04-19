import { useAtom } from "jotai";

import type { Transaction } from "../../domain/entities/Transaction";
import { transactionsAtom, transactionStore } from "./transactionStore";

interface UseTransactionStore {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  setTransactions: (transactions: Transaction[]) => void;
}

export const useTransactionStore = (): UseTransactionStore => {
  const [transactions, setTransactions] = useAtom(transactionsAtom, {
    store: transactionStore,
  });

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  // const addWallet = (wallet: Wallet) => {
  //   setWalletsAtom((prev) => [...prev, wallet]);
  // };

  return {
    transactions,
    addTransaction,
    setTransactions: (transaction: Transaction[]) =>
      setTransactions([...transaction]),
    // setWallets,
    // addWallet,
    // selectWallet,
    // selectedWalletId,
  };
};
