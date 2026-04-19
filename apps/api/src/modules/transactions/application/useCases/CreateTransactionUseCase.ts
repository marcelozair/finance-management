import { Amount } from '../../../wallets/domain/vo/Amount';
import { Transaction } from '../../domain/entities/Transaction';
import { TransactionMapper } from '../mappers/TransactionMapper';
import { TransactionType } from '../../domain/vo/TransactionType';
import { TransactionDTO } from '../../presentation/dtos/TransactionDto';
import { CreateTransactionDTO } from '../../presentation/dtos/CreateTransactionDto';
import { TransactionRepository } from '../../domain/interfaces/TransactionRepository';
import { CategoryRepository } from '../../domain/interfaces/CategoryRepository';
import {
  CategoryNotFoundError,
  SubCategoryNotFoundError,
} from '../../domain/exceptions/CategoryExceptions';

export class CreateTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  /**
   * Create a new transaction for a wallet.
   * @param {number} walletId - The ID of the wallet to which the transaction belongs.
   * @param {CreateTransactionDTO} payload - The data required to create a transaction.
   * @returns {Promise<Transaction>} The created transaction.
   */
  async execute(
    walletId: number,
    payload: CreateTransactionDTO,
  ): Promise<TransactionDTO> {
    const newTrasaction = Transaction.forCreate(
      walletId,
      new Amount(payload.amount),
      payload.concept,
      new TransactionType(payload.type),
      payload.categoryId,
      payload.subCategoryId,
      payload.destinationWalletId,
    );

    const transaction = await this.transactionRepository.save(newTrasaction);

    const category = await this.categoryRepository.findById(payload.categoryId);
    const subCategory = category?._subCategories.find(
      ({ _id }) => _id === newTrasaction._subCategoryId,
    );

    if (!category) throw new CategoryNotFoundError();
    if (!subCategory) throw new SubCategoryNotFoundError();

    return TransactionMapper.toDto(
      transaction.addCategories(category, subCategory),
    );
  }
}
