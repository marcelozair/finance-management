import { useAtom } from "jotai";

import {
  categoriesAtom,
  paginationAtom,
  selectedTransactionAtom,
  transactionStore,
  transactionsByDateAtom,
  type TransactionsPagination,
} from "./transactionStore";

import type { Transaction } from "../../domain/entities/Transaction";
import type { TransactionsByDateDto } from "../../domain/interfaces/GroupedTransactionsDto";
import type { CategoryWihtSubCategoriesDto } from "../../domain/interfaces/CategoryWithSubCategoryDto";

interface UseTransactionStore {
  pagination: TransactionsPagination;
  selectedTransaction: Transaction | null;
  transactionsByDate: TransactionsByDateDto[];
  categories: CategoryWihtSubCategoriesDto[];
  addTransaction: (transaction: Transaction) => void;
  selectTransaction: (transaction: Transaction) => void;
  updatePagination: (pagination: TransactionsPagination) => void;
  updateTransactions: (grouped: TransactionsByDateDto[]) => void;
  setCategories: (categories: CategoryWihtSubCategoriesDto[]) => void;
}

export const useTransactionStore = (): UseTransactionStore => {
  const [transactionsByDate, setTransactions] = useAtom(
    transactionsByDateAtom,
    {
      store: transactionStore,
    },
  );

  const [categories, setCategories] = useAtom(categoriesAtom, {
    store: transactionStore,
  });

  const [selectedTransaction, transactionSelection] = useAtom(
    selectedTransactionAtom,
    {
      store: transactionStore,
    },
  );

  const selectTransaction = (transaction: Transaction) => {
    transactionSelection(transaction);
  };

  const [pagination, setPagination] = useAtom(paginationAtom, {
    store: transactionStore,
  });

  const obtainDateFromISODate = (date: string | Date) => {
    if (typeof date === "string") {
      const formated = new Date(date).toISOString();
      return formated.split("T")[0];
    }

    return date.toISOString().split("T")[0];
  };

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => {
      const transactionGrouped = obtainDateFromISODate(
        transaction._date.toISOString(),
      );

      console.log("transactionGrouped", transactionGrouped);
      console.log(prev);

      const existGroupDate = prev.find(
        (group) => group.date === transactionGrouped,
      );

      if (existGroupDate) {
        prev.map((group) => {
          if (group.date === transactionGrouped) {
            group.transactions.unshift(transaction);
          }

          return group;
        });

        return prev;
      }

      return [
        ...prev,
        { date: transactionGrouped, transactions: [transaction] },
      ];
    });
  };

  const updateTransactions = (grouped: TransactionsByDateDto[]) => {
    setTransactions(grouped);
  };

  return {
    pagination,
    categories,
    addTransaction,
    setCategories,
    selectTransaction,
    transactionsByDate,
    updateTransactions,
    selectedTransaction,
    updatePagination: setPagination,
  };
};
