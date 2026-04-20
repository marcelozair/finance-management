import { Box, HStack, VStack, Text } from "@chakra-ui/react";

import {
  Transaction,
  ExpenseTransaction,
  IncomeTransaction,
  TransferTransaction,
} from "src/modules/wallet/domain/entities/Transaction";

import { formatMoney } from "@shared/utils/currency";
import { useWalletStore } from "../../../store/useWalletStore";
import { RenderIcon } from "@shared/presentation/components/RenderIcon/RenderIcon";
import type { TransactionType } from "src/modules/wallet/domain/vo/TransactionType";

interface TransactionProps {
  transaction: Transaction;
}

export const TransactionCard = ({ transaction }: TransactionProps) => {
  const { selectedWallet } = useWalletStore();

  const getAmountColor = (transactionType: TransactionType): string => {
    if (transactionType.equals(IncomeTransaction)) return "green.500";
    if (transactionType.equals(ExpenseTransaction)) return "red.500";
    if (transactionType.equals(TransferTransaction)) return "gray.700";
    return "gray.700";
  };

  const getAmountOperation = (transactionType: TransactionType): string => {
    if (transactionType.equals(IncomeTransaction)) return "+";
    if (transactionType.equals(ExpenseTransaction)) return "-";
    return "";
  };

  return (
    <Box p="14px 16px" w="100%" borderRadius="14px" transition="0.2s ease">
      <HStack justify="space-between">
        {/* Left section */}
        <HStack>
          <Box
            bg={transaction._category?._color || "gray.700"}
            borderRadius="8px"
            w="40px"
            h="40px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <RenderIcon
              name={transaction._category?._iconName || "wallet"}
              className="text-white"
            />
          </Box>

          <VStack align="start" gap={0}>
            <Text color="black" fontWeight="600" fontSize="14px">
              {transaction._concept}
            </Text>

            <Text color="gray.400" fontSize="12px">
              {transaction._category?._name || "Other"}
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
            color={getAmountColor(transaction._type)}
            fontWeight="500"
            fontSize="14px"
          >
            {getAmountOperation(transaction._type)}
            {selectedWallet?._currency
              ? formatMoney(transaction._amount, selectedWallet?._currency)
              : transaction._amount.getValue()}
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
