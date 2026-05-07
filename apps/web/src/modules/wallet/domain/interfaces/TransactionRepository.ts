import type { Transaction } from "../entities/Transaction";
import type { CreateTransactionDto } from "../../application/dtos/CreateTransactionDto";

export interface TransactionRepository {
  getAll(walletId: number): Promise<Transaction[]>;
  create(walletId: number, payload: CreateTransactionDto): Promise<Transaction>;
}
