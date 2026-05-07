import { Box, Text } from "@chakra-ui/react";
import type { IconType } from "react-icons/lib";

interface TransactionTypeProps {
  Icon: IconType;
  label: string;
  color: string;
  active: boolean;
  onClick: () => void;
}

export const TransactionType = ({
  Icon,
  label,
  color,
  active,
  onClick,
}: TransactionTypeProps) => {
  return (
    <Box
      onClick={onClick}
      cursor="pointer"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-1px)",
        opacity: 1,
      }}
      bg={color + ".400"}
      border="solid 2px"
      borderColor={color + ".500"}
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      opacity={active ? 1 : 0.5}
      gap={1}
      w="100%"
      h="80px"
      p="10px"
      rounded="md"
    >
      <Icon size={25} color="black" />
      <Text fontWeight="bold" color="black" textAlign="center">
        {label}
      </Text>
    </Box>
  );
};
