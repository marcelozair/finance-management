import { useAtom } from "jotai";

import {
  IncomeTransaction,
  type Transaction,
} from "@modules/transaction/domain/entities/Transaction";

import type { Wallet } from "../../domain/entities/Wallet";
import { walletsAtom, walletStore, selectedWalletAtom } from "./walletStore";

interface UseWalletStore {
  wallets: Wallet[];
  selectedWallet: Wallet | null;
  addWallet: (wallets: Wallet) => void;
  selectWallet: (wallet: Wallet) => void;
  setWallets: (wallets: Wallet[], selected: number | null) => void;
  updateWallets: (
    transaction: Transaction,
    operation: "add" | "remove",
  ) => void;
}

export const useWalletStore = (): UseWalletStore => {
  const [wallets, setWalletsAtom] = useAtom(walletsAtom, {
    store: walletStore,
  });

  const [selectedWallet, selectWallet] = useAtom(selectedWalletAtom, {
    store: walletStore,
  });

  const setWallets = (
    walletsList: Wallet[],
    selectedWallet: number | null = null,
  ) => {
    setWalletsAtom([...walletsList]);

    if (!wallets.length && walletsList[0]) {
      const selected = walletsList.find(({ _id }) => _id === selectedWallet);
      selectWallet(selected || walletsList[0]);
    }
  };

  const addWallet = (wallet: Wallet) => {
    setWalletsAtom((prev) => [...prev, wallet]);
  };

  const updateWallets = (
    transaction: Transaction,
    operation: "add" | "remove",
  ) => {
    setWalletsAtom((prev) =>
      prev.map((wallet) => {
        let newBalance = wallet._balance;

        const isSource =
          wallet._id === transaction._walletId &&
          wallet._id !== transaction._destinationWalletId;
        const isDestination = wallet._id === transaction._destinationWalletId;

        if (isSource) {
          if (operation === "add") {
            if (transaction._type === IncomeTransaction) {
              newBalance = newBalance.add(transaction._amount);
            } else {
              newBalance = newBalance.subtract(transaction._amount);
            }
          }

          if (operation === "remove") {
            if (transaction._type === IncomeTransaction) {
              newBalance = newBalance.subtract(transaction._amount);
            } else {
              newBalance = newBalance.add(transaction._amount);
            }
          }
        }

        if (isDestination) {
          if (operation === "add") {
            newBalance = newBalance.add(transaction._amount);
          }

          if (operation === "remove") {
            newBalance = newBalance.subtract(transaction._amount);
          }
        }

        // return new wallet instead of mutating
        return isSource || isDestination
          ? wallet.cloneWithBalance(newBalance)
          : wallet;
      }),
    );
  };

  return {
    wallets,
    addWallet,
    setWallets,
    selectWallet,
    updateWallets,
    selectedWallet,
  };
};
