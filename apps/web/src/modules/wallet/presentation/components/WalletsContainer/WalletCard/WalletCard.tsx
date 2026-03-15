import { Button, Box, VStack, Text } from "@chakra-ui/react";

interface WalletCardProps {
  selected: boolean;
  walletName?: string;
  balance?: string;
  colorBar?: string;
  onClick?: () => void;
}

export const WalletCard = ({
  selected,
  walletName = "BCP",
  balance = "10,000 MXN",
  colorBar = "green.500",
  onClick,
}: WalletCardProps) => {
  return (
    <Button
      as="div"
      width="13rem"
      minWidth="208px"
      height="4rem"
      padding="0.5rem"
      borderRadius="md"
      backgroundColor={selected ? "gray.100" : "gray.50"}
      border={selected ? "2px solid" : "2px solid transparent"}
      borderColor={selected ? "gray.300" : "transparent"}
      _dark={{
        backgroundColor: selected ? "gray.800" : "gray.900",
        borderColor: selected ? "gray.600" : "transparent",
      }}
      boxShadow={selected ? "sm" : "none"}
      transition="all 0.3s ease"
      display="flex"
      gap="0.5rem"
      cursor="pointer"
      _hover={{
        transform: "translateY(-2px)",
      }}
      _active={{
        transform: "translateY(0)",
      }}
      onClick={onClick}
    >
      <Box
        width="2"
        height="100%"
        backgroundColor={colorBar}
        borderRadius="sm"
        flexShrink={0}
      />
      <VStack
        align="flex-start"
        justify="center"
        width="full"
        textAlign="left"
        gap="0"
      >
        <Text
          fontSize="sm"
          fontWeight="bold"
          color="gray.900"
          _dark={{
            color: "gray.50",
          }}
          truncate
        >
          {walletName}
        </Text>
        <Text
          fontSize="sm"
          fontWeight="bold"
          color="gray.900"
          _dark={{
            color: "gray.50",
          }}
        >
          {balance}
        </Text>
      </VStack>
    </Button>
  );
};
