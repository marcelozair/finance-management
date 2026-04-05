import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Amount } from 'src/modules/wallets/domain/vo/Amount';
import { TransactionEntity } from '../entities/transaction.entity';
import { Transaction } from 'src/modules/wallets/domain/entities/Transaction';
import { TransactionEnum } from 'src/modules/wallets/domain/vo/TransactionType';
import { TransactionRepository } from 'src/modules/wallets/domain/interfaces/TransactionRepository';
import { TransactionMapper } from 'src/modules/wallets/application/mappers/TransactionMapper';

@Injectable()
export class TransactionRepositoryImpl implements TransactionRepository {
  @InjectRepository(TransactionEntity)
  private readonly repository: Repository<TransactionEntity>;

  async initialTransaction(walletId: number, amount: Amount): Promise<void> {
    // Implementation for creating an initial transaction with a zero amount
    const initialTransaction = this.repository.create({
      walletId,
      category: 'initial',
      amount: amount.getValue(),
      concept: 'Initial Balance',
      type: TransactionEnum.INCOME,
    });

    await this.repository.save(initialTransaction);
  }

  /**
   * Persists a new transaction or updates an existing one.
   * Maps domain getters to the TypeORM entity structure.
   */
  async save(transaction: Transaction): Promise<Transaction> {
    const transactionPayload = this.repository.create({
      walletId: transaction._walletId,
      amount: transaction._amount,
      concept: transaction._concept,
      type: transaction._type,
      category: transaction._category,
      destinationWalletId: transaction._destinationWalletId as
        | number
        | undefined,
    });

    const savedEntity = await this.repository.save(transactionPayload);

    // Return the domain version of the saved data (including DB-generated ID/dates)
    return TransactionMapper.entityToDomain(savedEntity);
  }

  /**
   * Retrieves all transactions for a specific wallet,
   * ordered by most recent to oldest.
   */
  async findByWallet(walletId: number): Promise<Transaction[]> {
    const entities = await this.repository.find({
      where: { walletId: walletId },
      order: { createdAt: 'DESC' },
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
}
