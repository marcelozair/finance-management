import { Flex } from "@chakra-ui/react";
import { WalletCard } from "./WalletCard/WalletCard";
import { CreateWalletCard } from "./CreateWalletCard/CreateWalletCard";
import { CreateWalletModal } from "./CreateWalletModal/CreateWalletModal";
import { useState } from "react";

const mockWallets = [1, 2, 3, 4, 5];

export const WalletsContainer = () => {
  const [createModal, setCreateModal] = useState(false);

  return (
    <Flex gap={2} flexWrap={"wrap"}>
      <CreateWalletModal
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
      />
      <CreateWalletCard openModal={() => setCreateModal(true)} />
      {mockWallets.map((value) => (
        <WalletCard key={value} selected={value === 1} />
      ))}
    </Flex>
  );
};
