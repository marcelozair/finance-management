import type { CreateTransactionDto } from "../dtos/CreateTransactionDto";
import type { TransactionRepository } from "../../domain/interfaces/TransactionRepository";
import type { Transaction } from "../../domain/entities/Transaction";

export class CreateTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  execute(
    walletId: number,
    transaction: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionRepository.create(walletId, transaction);
  }
}
