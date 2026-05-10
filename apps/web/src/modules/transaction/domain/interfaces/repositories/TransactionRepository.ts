import type { Transaction } from "../../entities/Transaction";
import type { CreateTransactionDto } from "../CreateTransactionDto";
import type { GroupedTransactionsDto } from "../GroupedTransactionsDto";

export interface TransactionRepository {
  getAll(
    walletId: number,
    page: number,
    size: number,
  ): Promise<GroupedTransactionsDto>;
  create(walletId: number, payload: CreateTransactionDto): Promise<Transaction>;
  remove(walletId: number, transactionId: number): Promise<void>;
}
