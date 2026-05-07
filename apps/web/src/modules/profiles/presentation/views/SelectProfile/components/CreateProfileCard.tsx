import { Box, Flex, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

interface CreateProfileCardProps {
  onClick: () => void;
}

export const CreateProfileCard = ({ onClick }: CreateProfileCardProps) => {
  return (
    <Box
      onClick={onClick}
      borderWidth="2px"
      borderStyle="dashed"
      borderColor={{ base: "gray.300", _dark: "gray.600" }}
      borderRadius="xl"
      p={6}
      cursor="pointer"
      bg={{ base: "gray.50", _dark: "gray.800" }}
      _hover={{
        transform: "translateY(-4px)",
        shadow: "md",
        borderColor: { base: "blue.400", _dark: "blue.300" },
        bg: { base: "blue.50", _dark: "blue.900" },
      }}
      transition="all 0.2s"
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="150px"
    >
      <Flex
        direction="column"
        align="center"
        gap={4}
        color={{ base: "gray.500", _dark: "gray.400" }}
        _hover={{ color: { base: "blue.500", _dark: "blue.400" } }}
      >
        <FaPlus size={24} />
        <Text fontWeight="medium" textAlign="center" fontSize="md">
          Create New Profile
        </Text>
      </Flex>
    </Box>
  );
};
