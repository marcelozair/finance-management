import { Box, HStack, VStack, Text } from "@chakra-ui/react";
import { RenderIcon } from "@shared/presentation/components/RenderIcon/RenderIcon";
import type { Transaction } from "src/modules/wallet/domain/entities/Transaction";

interface TransactionProps {
  transaction: Transaction;
}

export const TransactionCard = ({ transaction }: TransactionProps) => {
  // const date = new Date().toLocaleDateString();

  return (
    <Box p="14px 16px" w="100%" borderRadius="14px" transition="0.2s ease">
      <HStack justify="space-between">
        {/* Left section */}
        <HStack>
          <Box
            bg={transaction._category.color}
            borderRadius="8px"
            w="40px"
            h="40px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <RenderIcon
              name={transaction._category.icon}
              className="text-white"
            />
          </Box>

          <VStack align="start" gap={0}>
            <Text color="black" fontWeight="600" fontSize="14px">
              {transaction._concept}
            </Text>

            <Text color="gray.400" fontSize="12px">
              {transaction._category.label}
            </Text>

            {/* ✅ New date */}
            {/* <Text color="gray.300" fontSize="11px">
              {date}
            </Text> */}
          </VStack>
        </HStack>

        {/* Right section */}
        <VStack align="end" gap={0}>
          <Text
            color={transaction._type === "income" ? "green.500" : "red.500"}
            fontWeight="500"
            fontSize="14px"
          >
            {transaction._type === "income" ? "+" : "-"}{" "}
            {transaction._formattedAmount}
          </Text>

          {/* Optional: show date on right instead */}
          {/* <Text fontSize="11px" color="gray.400">
            {date}
          </Text> */}
        </VStack>
      </HStack>
    </Box>
  );
};
