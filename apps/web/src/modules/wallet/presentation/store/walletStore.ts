import { atom, createStore } from "jotai";
import type { Wallet } from "../../domain/entities/Wallet";

export const walletStore = createStore();

/**
 * Wallet list available for customer profile
 */
export const walletsAtom = atom<Wallet[]>([]);
export const selectedWalletAtom = atom<number | null>(null);

/**
 * Initialize default state
 */
walletStore.set(walletsAtom, []);
walletStore.set(selectedWalletAtom, null);
