import type { Transaction } from "../entities/Transaction";
import type { MetaDataPaginationDto } from "src/core/domain/dtos/PaginationDto";

export interface TransactionsByDateDto {
  date: string;
  transactions: Transaction[];
}

export interface GroupedTransactionsDto {
  metadata: MetaDataPaginationDto;
  dates: TransactionsByDateDto[];
}
