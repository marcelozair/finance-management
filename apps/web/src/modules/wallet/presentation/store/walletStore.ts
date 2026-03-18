import { atom, createStore } from "jotai";
import type { Wallet } from "../../domain/entities/Wallet";

export const walletStore = createStore();

/**
 * Wallet list available for customer profile
 */
export const walletsAtom = atom<Wallet[]>([]);

/**
 * Initialize default state
 */
walletStore.set(walletsAtom, []);
