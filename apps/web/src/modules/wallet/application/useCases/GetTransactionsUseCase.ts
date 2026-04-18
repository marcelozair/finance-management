import type { Transaction } from "../../domain/entities/Transaction";
import type { TransactionRepository } from "../../domain/interfaces/TransactionRepository";

export class GetTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  execute(walletId: number): Promise<Transaction[]> {
    return this.transactionRepository.getAll(walletId);
  }
}
