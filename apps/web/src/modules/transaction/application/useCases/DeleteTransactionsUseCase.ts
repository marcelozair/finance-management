import type { TransactionRepository } from "../../domain/interfaces/repositories/TransactionRepository";

export class DeleteTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  execute(walletId: number, transactionId: number): Promise<void> {
    return this.transactionRepository.remove(walletId, transactionId);
  }
}
