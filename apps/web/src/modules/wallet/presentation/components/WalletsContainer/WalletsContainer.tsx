import { Flex, ScrollArea } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { WalletCard } from "./WalletCard/WalletCard";
import { WalletCardSkeleton } from "./WalletCard/WalletCardSkeleton";
import { CreateWalletCard } from "./CreateWalletCard/CreateWalletCard";
import { CreateWalletModal } from "./CreateWalletModal/CreateWalletModal";
import { useExecuteUseCase } from "@shared/presentation/hooks/useExecuteUseCase";
import { WalletDomain } from "src/modules/wallet/application";
import { useWalletStore } from "../../store/useWalletStore";
import { useProfile } from "@shared/presentation/store/profile/useProfile";

const SKELETON_COUNT = 3;

export const WalletsContainer = () => {
  const walletDomain = new WalletDomain();

  const { profile } = useProfile();
  const { wallets, setWallets, selectWallet, selectedWalletId } =
    useWalletStore();
  const [createModal, setCreateModal] = useState(false);

  const { execute, loading } = useExecuteUseCase<void, number>({
    callback: async (profileId: number) => {
      const wallets = await walletDomain.getAll(profileId);
      setWallets(wallets);
    },
  });

  useEffect(() => {
    if (profile && profile.id) execute(profile.id);
  }, []);

  return (
    <>
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
                ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                    <WalletCardSkeleton key={`skeleton-${i}`} />
                  ))
                : wallets.map((wallet) => (
                    <WalletCard
                      onClick={() => selectWallet(wallet._id)}
                      selected={wallet._id === selectedWalletId}
                      key={wallet._id}
                      wallet={wallet}
                    />
                  ))}
            </Flex>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="horizontal" />
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </>
  );
};
