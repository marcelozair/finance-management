import { TbFilterPlus, TbTableExport, TbTableImport } from "react-icons/tb";

import { Flex, Heading } from "@chakra-ui/react";
import { NoTransactions } from "./NoTransactions/NoTransactions";

export const WalletTransactions = () => {
  return (
    <div>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading size="xl">Wallet Transactions</Heading>
        <Flex gap={5}>
          <TbFilterPlus size={20} />
          <TbTableExport size={20} />
          <TbTableImport size={20} />
        </Flex>
      </Flex>
      <NoTransactions />
    </div>
  );
};
