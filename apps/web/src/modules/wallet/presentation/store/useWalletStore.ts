import { useAtom } from "jotai";

import {
  walletsAtom,
  walletStore,
  selectedWalletAtom,
  selectedWalletIdAtom,
} from "./walletStore";

import type { Wallet } from "../../domain/entities/Wallet";
import type { Transaction } from "../../domain/entities/Transaction";
import { TransactionEnum } from "../components/WalletTransactions/CreateTransaction/TransactionCatalogs";

interface UseWalletStore {
  wallets: Wallet[];
  selectedWallet: Wallet | null;
  selectedWalletId: number | null;
  addWallet: (wallets: Wallet) => void;
  selectWallet: (wallet: Wallet) => void;
  setWallets: (wallets: Wallet[]) => void;
  selectWalletId: (walletId: number) => void;

  updateWallets: (transaction: Transaction) => void;
}

export const useWalletStore = (): UseWalletStore => {
  const [wallets, setWalletsAtom] = useAtom(walletsAtom, {
    store: walletStore,
  });

  const [selectedWalletId, selectWalletId] = useAtom(selectedWalletIdAtom, {
    store: walletStore,
  });

  const [selectedWallet, selectWallet] = useAtom(selectedWalletAtom, {
    store: walletStore,
  });

  const setWallets = (walletsList: Wallet[]) => {
    setWalletsAtom([...walletsList]);

    if (!wallets.length && walletsList[0]) {
      selectWalletId(walletsList[0]._id);
      selectWallet(walletsList[0]);
    }
  };

  const addWallet = (wallet: Wallet) => {
    setWalletsAtom((prev) => [...prev, wallet]);
  };

  const updateWallets = (transaction: Transaction) => {
    setWalletsAtom((prev) =>
      prev.map((wallet) => {
        let newBalance = wallet._balance;

        const isSource = wallet._id === transaction._walletId;
        const isDestination = wallet._id === transaction._destinationWalletId;

        if (isSource) {
          if (transaction._type === TransactionEnum.INCOME) {
            newBalance = newBalance.add(transaction._amount);
          } else {
            newBalance = newBalance.subtract(transaction._amount);
          }
        }

        if (isDestination) {
          newBalance = newBalance.add(transaction._amount);
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
    selectWalletId,
    selectedWalletId,
  };
};
