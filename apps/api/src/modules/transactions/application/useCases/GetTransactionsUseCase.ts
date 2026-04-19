import { TransactionMapper } from '../mappers/TransactionMapper';
import {
  TransactionDTO,
  TransactionList,
  TransactionsGroupedByDate,
} from '../../presentation/dtos/TransactionDto';
import { TransactionRepository } from '../../domain/interfaces/TransactionRepository';
import { PaginationOptionsDto } from 'src/core/dtos/PaginationDto';
import { obtainDateFromISODate } from 'src/shared/utils/DateHandler';

export class GetTransactionsUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  /**
   * Get Transactions by wallet id.
   * @param {number} walletId wallet id
   * @returns {Promise<TransactionList>} list of transactions
   */
  async execute(
    walletId: number,
    paginationOptions: PaginationOptionsDto,
  ): Promise<TransactionList> {
    const totalTransactions =
      await this.transactionRepository.countByWallet(walletId);
    const transactions = await this.transactionRepository.findByWallet(
      walletId,
      paginationOptions,
    );

    const mappedTransactions = transactions.map((trans) =>
      TransactionMapper.toDto(trans),
    );

    const transactionList = mappedTransactions.reduce(
      (group: TransactionsGroupedByDate, transaction: TransactionDTO) => {
        const dateKey = obtainDateFromISODate(transaction.date);

        if (!group[dateKey]) {
          group[dateKey] = [transaction];
        } else {
          group[dateKey].push(transaction);
        }

        return group;
      },
      {},
    );

    const { page, limit } = paginationOptions;
    const lastPage = Math.floor(totalTransactions / limit);
    const nextPage = page + 1;

    return {
      metadata: {
        page: page,
        total: totalTransactions,
        nextPage: nextPage > lastPage ? null : nextPage,
        prevPage: page === 1 ? null : page - 1,
      },
      transactions: transactionList,
    };
  }
}
