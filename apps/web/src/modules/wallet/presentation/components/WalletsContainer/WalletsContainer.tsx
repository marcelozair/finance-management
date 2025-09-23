import { Flex } from "@chakra-ui/react";
import { WalletCard } from "./WalletCard/WalletCard";
import { CreateWalletCard } from "./CreateWalletCard/CreateWalletCard";

const mockWallets = [1, 2, 3, 4, 5];

export const WalletsContainer = () => {
  return (
    <Flex gap={2}>
      <CreateWalletCard />
      {mockWallets.map((value) => (
        <WalletCard selected={value === 1} />
      ))}
    </Flex>
  );
};
