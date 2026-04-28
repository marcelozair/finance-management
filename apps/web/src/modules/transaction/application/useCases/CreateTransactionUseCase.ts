import type { Transaction } from "../../domain/entities/Transaction";
import type { CreateTransactionDto } from "../../domain/interfaces/CreateTransactionDto";
import type { TransactionRepository } from "../../domain/interfaces/repositories/TransactionRepository";

export class CreateTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  execute(
    walletId: number,
    transaction: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionRepository.create(walletId, transaction);
  }
}
