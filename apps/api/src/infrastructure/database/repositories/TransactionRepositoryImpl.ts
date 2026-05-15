import { FindManyOptions, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Amount } from 'src/modules/wallets/domain/vo/Amount';
import { TransactionEntity } from '../entities/TransactionEntity';
import { Transaction } from 'src/modules/transactions/domain/entities/Transaction';
import { TransactionEnum } from 'src/modules/transactions/domain/vo/TransactionType';
import { TransactionRepository } from 'src/modules/transactions/domain/interfaces/TransactionRepository';
import { TransactionMapper } from 'src/modules/transactions/application/mappers/TransactionMapper';
import { PaginationOptionsDto } from 'src/core/dtos/PaginationDto';

@Injectable()
export class TransactionRepositoryImpl implements TransactionRepository {
  @InjectRepository(TransactionEntity)
  private readonly repository: Repository<TransactionEntity>;

  async initialTransaction(
    walletId: number,
    amount: Amount,
    profileId: number,
  ): Promise<void> {
    // Implementation for creating an initial transaction with a zero amount
    const initialTransaction = this.repository.create({
      walletId,
      profileId,
      categoryId: null as any,
      subCategoryId: null as any,
      amount: amount.getValue(),
      concept: 'Initial Balance',
      type: TransactionEnum.INCOME,
      date: new Date(),
    });

    await this.repository.save(initialTransaction);
  }

  /**
   * Persists a new transaction or updates an existing one.
   * Maps domain getters to the TypeORM entity structure.
   */
  async save(
    transaction: Transaction,
    profileId: number,
  ): Promise<Transaction> {
    const transactionPayload = this.repository.create({
      profileId: profileId,
      walletId: transaction._walletId,
      amount: transaction._amount.getValue(),
      concept: transaction._concept,
      date: transaction._date.toDate(),
      type: transaction._type.getValue(),
      categoryId: transaction._categoryId,
      subCategoryId: transaction._subCategoryId,
      destinationWalletId: transaction._destinationWalletId as
        | number
        | undefined,
    });

    const savedEntity = await this.repository.save(transactionPayload);
    return TransactionMapper.entityToDomain(savedEntity);
  }

  /**
   * This method return the count from total transactions by Wallet
   * @param {number} walletId Wallet ID
   * @returns {number} Total transaction count
   */
  async countByWallet(walletId: number): Promise<number> {
    return this.repository.count({
      where: { walletId: walletId },
    });
  }

  /**
   * Retrieves all transactions for a specific wallet,
   * ordered by most recent to oldest.
   */
  async findByWallet(
    walletId: number,
    paginationOptions?: PaginationOptionsDto,
  ): Promise<Transaction[]> {
    const paginationConfig: FindManyOptions<TransactionEntity> = {};

    if (paginationOptions) {
      paginationConfig.take = paginationOptions.limit;
      paginationConfig.skip =
        (paginationOptions.page - 1) * paginationOptions.limit;
    }

    const entities = await this.repository.find({
      where: { walletId: walletId },
      order: { createdAt: 'DESC' },
      relations: ['category', 'subCategory'],
      ...paginationConfig,
    });

    return entities.map((entity) => TransactionMapper.entityToDomain(entity));
  }

  /**
   * Finds a specific transaction by its unique identifier.
   */
  async findById(id: number): Promise<Transaction | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;

    return TransactionMapper.entityToDomain(entity);
  }

  async deleteById(id: number, profileId: number): Promise<boolean> {
    const result = await this.repository.softDelete({ id, profileId });
    return result.affected !== undefined && result.affected > 0;
  }
}
