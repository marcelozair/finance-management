import { Amount } from '../../domain/vo/Amount';
import { Transaction } from '../../domain/entities/Transaction';
import { TransactionType } from '../../domain/vo/TransactionType';
import { TransactionCategory } from '../../domain/vo/TransactionCategory';
import { CreateTransactionDTO } from '../../presentation/dtos/CreateTransactionDto';
import { TransactionRepository } from '../../domain/interfaces/TransactionRepository';

export class CreateTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  /**
   * Create a new transaction for a wallet.
   * @param {number} walletId - The ID of the wallet to which the transaction belongs.
   * @param {CreateTransactionDTO} payload - The data required to create a transaction.
   * @returns {Promise<Transaction>} The created transaction.
   */
  async execute(
    walletId: number,
    payload: CreateTransactionDTO,
  ): Promise<Transaction> {
    const newTrasaction = Transaction.forCreate(
      walletId,
      new Amount(payload.amount),
      payload.concept,
      new TransactionType(payload.type),
      new TransactionCategory(payload.category),
      payload.destinationWalletId,
    );

    const transaction = await this.transactionRepository.save(newTrasaction);

    return transaction;
  }
}
