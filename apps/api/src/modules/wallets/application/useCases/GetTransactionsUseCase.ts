import { TransactionRepository } from '../../domain/interfaces/TransactionRepository';
import { TransactionDTO } from '../../presentation/dtos/TransactionDto';
import { TransactionMapper } from '../mappers/TransactionMapper';

export class GetTransactionsUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  /**
   * Get Transactions by wallet id.
   * @param {number} walletId wallet id
   * @returns {Promise<TransactionDTO[]>} list of transactions
   */
  async execute(walletId: number): Promise<TransactionDTO[]> {
    const transactions =
      await this.transactionRepository.findByWallet(walletId);
    return transactions.map((trans) => TransactionMapper.toDto(trans));
  }
}
