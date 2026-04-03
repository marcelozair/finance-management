import { useAtom } from "jotai";
import { selectedWalletAtom, walletsAtom, walletStore } from "./walletStore";
import type { Wallet } from "../../domain/entities/Wallet";

interface UseWalletStore {
  wallets: Wallet[];
  setWallets: (wallets: Wallet[]) => void;
  addWallet: (wallets: Wallet) => void;
  selectWallet: (walletsId: number) => void;
  selectedWalletId: number | null;
}

export const useWalletStore = (): UseWalletStore => {
  const [wallets, setWalletsAtom] = useAtom(walletsAtom, {
    store: walletStore,
  });

  const [selectedWalletId, selectWallet] = useAtom(selectedWalletAtom, {
    store: walletStore,
  });

  const setWallets = (walletsList: Wallet[]) => {
    setWalletsAtom([...walletsList]);

    if (!wallets.length && walletsList[0]) {
      selectWallet(walletsList[0]._id);
    }
  };

  const addWallet = (wallet: Wallet) => {
    setWalletsAtom((prev) => [...prev, wallet]);
  };

  return {
    wallets,
    setWallets,
    addWallet,
    selectWallet,
    selectedWalletId,
  };
};
