import { useAtom } from "jotai";

import {
  categoriesAtom,
  paginationAtom,
  transactionStore,
  transactionsByDateAtom,
  selectedTransactionAtom,
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
  selectTransaction: (transaction: Transaction | null) => void;
  updatePagination: (pagination: TransactionsPagination) => void;
  updateTransactions: (grouped: TransactionsByDateDto[]) => void;
  setCategories: (categories: CategoryWihtSubCategoriesDto[]) => void;
  deleteTransaction: (transactionId: number) => void;
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

  const selectTransaction = (transaction: Transaction | null) => {
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

      const grouped = [
        ...prev,
        { date: transactionGrouped, transactions: [transaction] },
      ];

      return grouped.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateB.getTime() - dateA.getTime();
      });
    });
  };

  const deleteTransaction = (transactionId: number) => {
    setTransactions((prev) => {
      return prev
        .map((group) => {
          return {
            ...group,
            transactions: group.transactions.filter(
              (transaction) => transaction._id !== transactionId,
            ),
          };
        })
        .filter((group) => group.transactions.length > 0);
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
    deleteTransaction,
    transactionsByDate,
    updateTransactions,
    selectedTransaction,
    updatePagination: setPagination,
  };
};
