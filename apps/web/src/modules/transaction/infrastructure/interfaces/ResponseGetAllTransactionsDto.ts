import type {
  CategoryDto,
  SubCategoryDto,
} from "../../domain/interfaces/CategoryWithSubCategoryDto";

import type { MetaDataPaginationDto } from "src/core/domain/dtos/PaginationDto";

export interface TransactionDTO {
  id: number;
  date: string;
  type: string;
  amount: number;
  concept: string;
  walletId: number;
  destinationWalletId: number | null;
  category: CategoryDto | null;
  subCategory: SubCategoryDto | null;
}

export type ResponseTransactionsGroupedByDate = {
  [datetime: string]: TransactionDTO[];
};

export interface ResponseTransactionList {
  metadata: MetaDataPaginationDto;
  transactions: ResponseTransactionsGroupedByDate;
}
