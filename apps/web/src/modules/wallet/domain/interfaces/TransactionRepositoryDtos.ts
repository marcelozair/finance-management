import type { MetaDataPaginationDto } from "src/core/domain/dtos/PaginationDto";
import type { Transaction } from "../entities/Transaction";

export interface CategoryDto {
  id: number;
  name: string;
  color: string;
  iconName: string;
}

export interface SubCategoryDto {
  id: number;
  name: string;
  iconName: string;
}

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

export type TransactionsByDate = {
  date: string;
  transactions: Transaction[];
};

export interface TransactionList {
  metadata: MetaDataPaginationDto;
  dates: TransactionsByDate[];
}
