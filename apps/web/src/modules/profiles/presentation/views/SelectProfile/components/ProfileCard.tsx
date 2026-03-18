import { FaWallet } from "react-icons/fa";
import { Box, Flex, Text } from "@chakra-ui/react";
import type { Profile } from "../../../../domain/entities/Profile";

interface ProfileCardProps {
  profile: Profile;
  onClick: () => void;
}

export const ProfileCard = ({ profile, onClick }: ProfileCardProps) => {
  return (
    <Box
      onClick={onClick}
      borderWidth="2px"
      borderColor={{
        base: "gray.200",
        _dark: "gray.700",
      }}
      borderRadius="xl"
      p={2}
      cursor="pointer"
      bg={{
        base: "white",
        _dark: "gray.800",
      }}
      _hover={{
        transform: "translateY(-4px)",
        shadow: "lg",
        borderColor: {
          base: "blue.300",
          _dark: "blue.500",
        },
      }}
      transition="all 0.2s"
      position="relative"
      shadow="sm"
    >
      <Flex direction="column" align="center" justifyContent="center" h="100%">
        <FaWallet size={24} />
        <Box textAlign="center" mt={3}>
          <Text
            fontWeight="bold"
            fontSize="lg"
            color={{ base: "gray.800", _dark: "white" }}
          >
            {profile.name}
          </Text>
          <Text
            fontSize="sm"
            color={{ base: "gray.500", _dark: "gray.400" }}
            mt={1}
          >
            Currency:{" "}
            <Text
              as="span"
              fontWeight="semibold"
              color={{ base: "gray.700", _dark: "gray.300" }}
            >
              {profile.currency}
            </Text>
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
