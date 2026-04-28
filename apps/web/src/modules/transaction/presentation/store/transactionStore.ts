import { atom, createStore } from "jotai";
import type { TransactionsByDateDto } from "../../domain/interfaces/GroupedTransactionsDto";
import type { CategoryWihtSubCategoriesDto } from "../../domain/interfaces/CategoryWithSubCategoryDto";
import { Transaction } from "../../domain/entities/Transaction";

export interface TransactionsPagination {
  currentPage: number;
  pageSize: number;
  total: number;
  nextPage: number | null;
  prevPage: number | null;
}

export const transactionStore = createStore();

/**
 * Transactions list available for customer profile
 */
export const transactionsByDateAtom = atom<TransactionsByDateDto[]>([]);

export const selectedTransactionAtom = atom<Transaction | null>(null);

export const categoriesAtom = atom<CategoryWihtSubCategoriesDto[]>([]);

export const paginationAtom = atom<TransactionsPagination>({
  currentPage: 1,
  pageSize: 10,
  total: 0,
  prevPage: null,
  nextPage: null,
});

/**
 * Initialize default state
 */
transactionStore.set(transactionsByDateAtom, []);
transactionStore.set(selectedTransactionAtom, null);
transactionStore.set(categoriesAtom, []);
transactionStore.set(paginationAtom, {
  currentPage: 1,
  pageSize: 10,
  total: 0,
  prevPage: null,
  nextPage: null,
});
