import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";

import { WalletCard } from "./WalletCard/WalletCard";
import { CreateWalletCard } from "./CreateWalletCard/CreateWalletCard";
import { CreateWalletModal } from "./CreateWalletModal/CreateWalletModal";
import { useExecuteUseCase } from "@shared/presentation/hooks/useExecuteUseCase";
import { WalletDomain } from "src/modules/wallet/application";
import { useWalletStore } from "../../store/useWalletStore";
import { useProfile } from "@shared/presentation/store/profile/useProfile";

export const WalletsContainer = () => {
  const walletDomain = new WalletDomain();

  const { profile } = useProfile();
  const { wallets, setWallets } = useWalletStore();
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
    <Flex gap={2} flexWrap={"wrap"}>
      <CreateWalletModal
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
      />

      <CreateWalletCard openModal={() => setCreateModal(true)} />

      {wallets.map((wallet) => (
        <WalletCard
          selected={wallet._id === 1}
          key={wallet._id}
          wallet={wallet}
        />
      ))}
    </Flex>
  );
};
