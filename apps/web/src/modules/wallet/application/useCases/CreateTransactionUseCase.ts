import type { CreateTransactionDto } from "../dtos/CreateTransactionDto";
import type { TransactionRepository } from "../../domain/interfaces/TransactionRepository";

export class CreateTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  execute(walletId: number, transaction: CreateTransactionDto): Promise<void> {
    return this.transactionRepository.create(walletId, transaction);
  }
}
