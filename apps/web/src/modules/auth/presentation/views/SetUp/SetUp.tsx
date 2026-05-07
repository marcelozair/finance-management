import { Center, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const messages = [
  { message: "We are creating your account", duration: 2000 },
  { message: "This will take few seconds", duration: 3000 },
];

export const SetUpView = () => {
  const [message, setMessage] = useState("");

  const renderMessages = async () => {
    for await (const msg of messages) {
      setMessage(msg.message);
      await new Promise((res) => {
        setTimeout(res, msg.duration);
      });
    }
  };

  useEffect(() => {
    renderMessages();
  }, []);

  return (
    <Flex justify="center" alignItems="center" w="100vw" h="100vh">
      <Center>
        <Text animation="pulse 2s infinite ease-in-out" fontSize="xl">
          {message}
        </Text>
      </Center>
    </Flex>
  );
};
