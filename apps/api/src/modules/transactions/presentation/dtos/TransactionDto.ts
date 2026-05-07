import { CategoryDto } from './CategoryDto';
import { SubCategoryDto } from './SubCategoryDto';
import { MetaDataPaginationOptionsDto } from 'src/core/dtos/PaginationDto';

export type TransactionsGroupedByDate = {
  [datetime: string]: TransactionDTO[];
};

export interface TransactionList {
  metadata: MetaDataPaginationOptionsDto;
  transactions: TransactionsGroupedByDate;
}

export interface TransactionDTO {
  id: number;
  type: string;
  date: string;
  amount: number;
  concept: string;
  walletId: number;
  category: CategoryDto | null;
  subCategory: SubCategoryDto | null;
  destinationWalletId: number | null;
}
