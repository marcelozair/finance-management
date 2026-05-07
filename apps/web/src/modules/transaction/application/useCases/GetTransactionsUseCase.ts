import type { GroupedTransactionsDto } from "../../domain/interfaces/GroupedTransactionsDto";
import type { TransactionRepository } from "../../domain/interfaces/repositories/TransactionRepository";

export class GetTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  execute(
    walletId: number,
    page: number,
    size: number,
  ): Promise<GroupedTransactionsDto> {
    return this.transactionRepository.getAll(walletId, page, size);
  }
}
