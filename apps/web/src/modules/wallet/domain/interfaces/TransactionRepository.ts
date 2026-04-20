import type { Transaction } from "../entities/Transaction";
import type { CreateTransactionDto } from "../../application/dtos/CreateTransactionDto";
import type { TransactionList } from "./TransactionRepositoryDtos";

export interface TransactionRepository {
  getAll(walletId: number): Promise<TransactionList>;
  create(walletId: number, payload: CreateTransactionDto): Promise<Transaction>;
}
