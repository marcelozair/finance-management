import { atom, createStore } from "jotai";
import type { Transaction } from "../../domain/entities/Transaction";

export const transactionStore = createStore();

/**
 * Transactions list available for customer profile
 */
export const transactionsAtom = atom<Transaction[]>([]);

/**
 * Initialize default state
 */
transactionStore.set(transactionsAtom, []);
