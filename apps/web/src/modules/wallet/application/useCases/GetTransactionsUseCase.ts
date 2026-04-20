import type { TransactionList } from "../../domain/interfaces/TransactionRepositoryDtos";
import type { TransactionRepository } from "../../domain/interfaces/TransactionRepository";

export class GetTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  execute(walletId: number): Promise<TransactionList> {
    return this.transactionRepository.getAll(walletId);
  }
}
