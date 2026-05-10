import { Box, Flex, Heading } from "@chakra-ui/react";
import { TbFilterPlus, TbTableExport, TbTableImport } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

import { useTransactionStore } from "../store/useTransactionStore";
import { Tooltip } from "@shared/presentation/ui/Tooltip";
import { DeleteTransactionModal } from "../modals/DeleteTransactionModal/DeleteTransactionModal";
import { useModal } from "@shared/presentation/hooks/useModal";

export const TransactionHeader = () => {
  const { selectedTransaction } = useTransactionStore();
  const { isOpen, close, open } = useModal();

  return (
    <>
      <DeleteTransactionModal onClose={close} isOpen={isOpen} />
      <Flex justifyContent="space-between" alignItems="center" mb={5}>
        <Heading size="xl">Transactions</Heading>
        <Flex gap={5}>
          {selectedTransaction && (
            <>
              <Tooltip content="Update Transaction">
                <Box cursor="pointer">
                  <FaRegEdit size={20} />
                </Box>
              </Tooltip>
              <Tooltip content="Delete Transaction">
                <Box cursor="pointer" onClick={open}>
                  <MdOutlineDelete size={20} />
                </Box>
              </Tooltip>
            </>
          )}
          {!selectedTransaction && (
            <>
              <TbFilterPlus size={20} />
              <TbTableExport size={20} />
              <TbTableImport size={20} />
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
};
