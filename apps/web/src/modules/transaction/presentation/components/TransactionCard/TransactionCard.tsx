import { useMemo } from "react";
import { Box, HStack, VStack, Text } from "@chakra-ui/react";

import {
  ExpenseTransaction,
  IncomeTransaction,
  TransferTransaction,
  type Transaction,
} from "@modules/transaction/domain/entities/Transaction";

import { formatMoney } from "@shared/utils/currency";
import { useTransactionStore } from "../../store/useTransactionStore";
import { useConfig } from "@shared/presentation/store/appConfig/useAppConfig";
import { RenderIcon } from "@shared/presentation/components/RenderIcon/RenderIcon";
import { useWalletStore } from "@modules/wallet/presentation/store/useWalletStore";
import type { TransactionType } from "@modules/transaction/domain/vo/TransactionType";

interface TransactionProps {
  selected: boolean;
  transaction: Transaction;
}

export const TransactionCard = ({
  transaction,
  selected,
}: TransactionProps) => {
  const { selectedWallet } = useWalletStore();
  const { system } = useConfig();
  const { selectTransaction } = useTransactionStore();

  const amountColor = useMemo((): string => {
    if (transaction._type.equals(IncomeTransaction)) return "green.500";
    if (transaction._type.equals(ExpenseTransaction)) return "red.500";
    if (transaction._type.equals(TransferTransaction))
      return system.theme === "dark" ? "gray.200" : "gray.700";
    return "gray.700";
  }, [transaction, system]);

  const getAmountOperation = (transactionType: TransactionType): string => {
    if (transactionType.equals(IncomeTransaction)) return "+";
    if (transactionType.equals(ExpenseTransaction)) return "-";
    return "";
  };

  return (
    <Box
      onClick={() => selectTransaction(selected ? null : transaction)}
      p="14px 16px"
      w="100%"
      borderRadius="14px"
      transition="0.3s ease"
      cursor={"pointer"}
      _hover={selected ? undefined : { opacity: 0.5 }}
      borderWidth="2px"
      // borderColor="transparent"
      borderColor={selected ? "border" : "transparent"}
    >
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
              color="white"
              name={transaction._subCategory?._iconName || "wallet"}
            />
          </Box>

          <VStack align="start" gap={0}>
            <Text fontWeight="600" fontSize="14px">
              {transaction._concept}
            </Text>

            <Text color="gray.400" fontSize="12px">
              {transaction._category?._name || "Other"}/
              {transaction._subCategory?._name || "Other"}
            </Text>

            {/* ✅ New date */}
            {/* <Text color="gray.300" fontSize="11px">
              {date}
            </Text> */}
          </VStack>
        </HStack>

        {/* Right section */}
        <VStack align="end" gap={0}>
          <Text color={amountColor} fontWeight="500" fontSize="14px">
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
