import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { ButtonGroup, Flex, IconButton, Pagination } from "@chakra-ui/react";

import { useTransactionStore } from "../../store/useTransactionStore";
import { useExecuteUseCase } from "@shared/presentation/hooks/useExecuteUseCase";
import { useWalletStore } from "../../../../wallet/presentation/store/useWalletStore";
import { useWalletDomain } from "../../../../wallet/presentation/hooks/useWalletDomain";

export const TransactionsPagination = () => {
  const domain = useWalletDomain();

  const { selectedWallet } = useWalletStore();
  const { pagination, updateTransactions, updatePagination } =
    useTransactionStore();

  const { execute } = useExecuteUseCase({
    callback: async (page: number): Promise<void> => {
      if (selectedWallet) {
        const response = await domain.getAllTransactions(
          selectedWallet._id,
          page,
          pagination.pageSize,
        );
        updateTransactions(response.dates);
        updatePagination({
          ...pagination,
          currentPage: page,
          total: response.metadata.total,
          nextPage: response.metadata.nextPage,
          prevPage: response.metadata.prevPage,
        });
      }
    },
  });

  const handlePaginationChange = (page: number | null) => {
    if (page) execute(page);
  };

  return (
    <Flex justifyContent={"flex-end"} mt={10} width="100%">
      <Pagination.Root
        maxW="240px"
        defaultPage={1}
        count={pagination.total}
        pageSize={pagination.pageSize}
        page={pagination.currentPage}
        onPageChange={(e) => handlePaginationChange(e.page)}
      >
        <ButtonGroup variant="ghost" size="sm" w="full">
          <Pagination.PageText format="long" flex="1" color="gray.500" />
          <Pagination.PrevTrigger asChild>
            <IconButton>
              <LuChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>
          <Pagination.NextTrigger asChild>
            <IconButton>
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Flex>
  );
};
