import { atom, createStore } from "jotai";
import type { TransactionsByDate } from "../../domain/interfaces/TransactionRepositoryDtos";

export const transactionStore = createStore();

/**
 * Transactions list available for customer profile
 */
export const transactionsByDateAtom = atom<TransactionsByDate[]>([]);

/**
 * Initialize default state
 */
transactionStore.set(transactionsByDateAtom, []);
