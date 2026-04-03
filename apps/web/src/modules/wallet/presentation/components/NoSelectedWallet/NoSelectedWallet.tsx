import { Container, Flex, Grid, Text } from "@chakra-ui/react";
import { PiListChecksBold } from "react-icons/pi";

export const NoSelectedWallet = () => {
  return (
    <Grid mt={10} gap={10} w="100%">
      <Container mt={10} padding={20} borderWidth={1} borderStyle="dashed">
        <Flex
          justifyContent="center"
          alignItems="center"
          direction="column"
          mt={10}
          gap={4}
        >
          <PiListChecksBold color="#ccc" size={50} />
          <Text color="gray.400">Select a wallet</Text>
        </Flex>
      </Container>
    </Grid>
  );
};
