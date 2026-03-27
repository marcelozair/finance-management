import { useAtom } from "jotai";
import { walletsAtom, walletStore } from "./walletStore";
import type { Wallet } from "../../domain/entities/Wallet";

export const useWalletStore = () => {
  const [wallets, setWalletsAtom] = useAtom(walletsAtom, {
    store: walletStore,
  });

  const setWallets = (walletsList: Wallet[]) => {
    setWalletsAtom([...walletsList]);
  };

  const addWallet = (wallet: Wallet) => {
    setWalletsAtom((prev) => [...prev, wallet]);
  };

  return {
    wallets,
    setWallets,
    addWallet,
  };
};
