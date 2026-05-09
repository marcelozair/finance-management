import { useEffect, useState } from "react";
import { Flex, ScrollArea } from "@chakra-ui/react";

import { WalletCard } from "./WalletCard/WalletCard";
import { useWalletStore } from "../../store/useWalletStore";
import { useWalletDomain } from "../../hooks/useWalletDomain";
import { WalletCardSkeleton } from "./WalletCard/WalletCardSkeleton";
import { CreateWalletCard } from "./CreateWalletCard/CreateWalletCard";
import { CreateWalletModal } from "./CreateWalletModal/CreateWalletModal";
import { useExecuteUseCase } from "@shared/presentation/hooks/useExecuteUseCase";
import { useTransactionStore } from "../../../../transaction/presentation/store/useTransactionStore";

export const WalletsContainer = () => {
  const walletDomain = useWalletDomain();
  const { updateTransactions } = useTransactionStore();

  const { wallets, setWallets, selectedWallet, selectWallet } =
    useWalletStore();

  const [createModal, setCreateModal] = useState(false);

  const { execute, loading } = useExecuteUseCase<void, void>({
    callback: async () => {
      const wallets = await walletDomain.getAll();
      setWallets(wallets);
    },
  });

  const handleWalletSelection = (walletId: number) => {
    if (selectedWallet && selectedWallet._id != walletId) {
      const wallet = wallets.find(({ _id }) => _id === walletId);
      if (wallet) {
        updateTransactions([]);
        selectWallet(wallet);
      }
    }
  };

  useEffect(() => {
    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollArea.Root size="xs">
      <ScrollArea.Viewport>
        <ScrollArea.Content py="4">
          <Flex gap="2" flexWrap="nowrap">
            <CreateWalletModal
              isOpen={createModal}
              onClose={() => setCreateModal(false)}
            />
            <CreateWalletCard openModal={() => setCreateModal(true)} />
            {loading
              ? Array(3)
                  .fill(null)
                  .map((_, i) => <WalletCardSkeleton key={`skeleton-${i}`} />)
              : wallets.map((wallet) => (
                  <WalletCard
                    wallet={wallet}
                    key={wallet._id}
                    selected={wallet._id === selectedWallet?._id}
                    onClick={() => handleWalletSelection(wallet._id)}
                  />
                ))}
          </Flex>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal" />
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
};
