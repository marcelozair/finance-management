import { Center, Spinner } from "@chakra-ui/react";

export const LoadingPage = () => {
  return (
    <Center w="100vw" h="100vh" bg="white" _dark={{ bg: "black" }}>
      <Spinner color="black" _dark={{ color: "white" }} size="lg" />
    </Center>
  );
};
