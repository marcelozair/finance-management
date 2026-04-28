import { useEffect, useState } from "react";
import { Flex, ScrollArea } from "@chakra-ui/react";

import { WalletCard } from "./WalletCard/WalletCard";
import { useWalletStore } from "../../store/useWalletStore";
import { useWalletDomain } from "../../hooks/useWalletDomain";
import { WalletCardSkeleton } from "./WalletCard/WalletCardSkeleton";
import { CreateWalletCard } from "./CreateWalletCard/CreateWalletCard";
import { CreateWalletModal } from "./CreateWalletModal/CreateWalletModal";
import { useProfile } from "@shared/presentation/store/profile/useProfile";
import { useExecuteUseCase } from "@shared/presentation/hooks/useExecuteUseCase";
import { useTransactionStore } from "../../../../transaction/presentation/store/useTransactionStore";

export const WalletsContainer = () => {
  const { profile } = useProfile();
  const walletDomain = useWalletDomain();
  const { updateTransactions } = useTransactionStore();

  const { wallets, setWallets, selectedWallet, selectWallet } =
    useWalletStore();

  const [createModal, setCreateModal] = useState(false);

  const { execute, loading } = useExecuteUseCase<void, number>({
    callback: async (profileId: number) => {
      const wallets = await walletDomain.getAll(profileId);
      setWallets(wallets);
    },
  });

  const handleWalletSelection = (walletId: number) => {
    if (selectedWallet && selectedWallet._id != walletId) {
      updateTransactions([]);
      selectWallet(selectedWallet);
    }
  };

  useEffect(() => {
    if (profile && profile.id) {
      execute(profile.id);
    }
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
              ? new Array(3).map((_, i) => (
                  <WalletCardSkeleton key={`skeleton-${i}`} />
                ))
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
