import { FaRegFolderOpen } from "react-icons/fa";
import { Button, Container, Flex, Text } from "@chakra-ui/react";

interface NoTransactionsProps {
  openModal: () => void;
}

export const NoTransactionsTable = ({ openModal }: NoTransactionsProps) => {
  return (
    <Container mt={10} padding={20} borderWidth={1} borderStyle="dashed">
      <Flex
        justifyContent="center"
        alignItems="center"
        direction="column"
        mt={10}
        gap={4}
      >
        <FaRegFolderOpen color="#ccc" size={50} />
        <Text color="gray.400">No Transactions found</Text>

        <Button onClick={openModal} variant="surface">
          Create transaction
        </Button>
      </Flex>
    </Container>
  );
};
