import { FaPlus } from "react-icons/fa";
import { Center, Text } from "@chakra-ui/react";

import "./CreateWalletCard.css";

interface CreateWalletCardProps {
  openModal: () => void;
}

export const CreateWalletCard = ({ openModal }: CreateWalletCardProps) => {
  return (
    <button style={{ cursor: "pointer" }} onClick={openModal}>
      <Center
        width="4rem"
        height="4rem"
        borderRadius="md"
        border="solid 1px"
        borderColor="gray.200"
      >
        <Text color="gray.500">
          <FaPlus />
        </Text>
      </Center>
    </button>
  );
};
