import { FaRegFolderOpen } from "react-icons/fa";
import { Container, Flex, Text } from "@chakra-ui/react";

export const NoTransactions = () => {
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
      </Flex>
    </Container>
  );
};
