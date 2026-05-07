import { FaPlus } from "react-icons/fa";
import { Center, Text } from "@chakra-ui/react";

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
        border="dashed 1px"
        borderColor="gray.300"
      >
        <Text color="gray.300">
          <FaPlus />
        </Text>
      </Center>
    </button>
  );
};
