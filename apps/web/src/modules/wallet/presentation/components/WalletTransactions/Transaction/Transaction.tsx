import { Box, HStack, VStack, Text } from "@chakra-ui/react";
import { RenderIcon } from "@shared/presentation/components/RenderIcon/RenderIcon";
import { formatMoney } from "src/core/utils/currency";
import { Transaction } from "src/modules/wallet/domain/entities/Transaction";
import { useWalletStore } from "../../../store/useWalletStore";
import { TransactionEnum } from "../CreateTransaction/TransactionCatalogs";

interface TransactionProps {
  transaction: Transaction;
}

export const TransactionCard = ({ transaction }: TransactionProps) => {
  const { selectedWallet } = useWalletStore();

  const getAmountColor = (transactionType: string): string => {
    switch (transactionType) {
      case TransactionEnum.INCOME:
        return "green.500";
      case TransactionEnum.EXPENSE:
        return "red.500";
      case TransactionEnum.TRANSFER:
        return "gray.700";
    }

    return "gray.700";
  };

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
            color={getAmountColor(transaction._type)}
            fontWeight="500"
            fontSize="14px"
          >
            {transaction._type === TransactionEnum.INCOME && "+"}
            {transaction._type === TransactionEnum.EXPENSE && "-"}
            {transaction._type === TransactionEnum.TRANSFER && ""}
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
