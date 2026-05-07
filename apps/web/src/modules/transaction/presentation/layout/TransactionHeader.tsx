import { Flex, Heading } from "@chakra-ui/react";
import { TbFilterPlus, TbTableExport, TbTableImport } from "react-icons/tb";

export const TransactionHeader = () => {
  return (
    <Flex justifyContent="space-between" alignItems="center" mb={5}>
      <Heading size="xl">Transactions</Heading>
      <Flex gap={5}>
        <TbFilterPlus size={20} />
        <TbTableExport size={20} />
        <TbTableImport size={20} />
      </Flex>
    </Flex>
  );
};
