import { Transaction } from '../entities/Transaction';
import { Amount } from '../../../wallets/domain/vo/Amount';
import { PaginationOptionsDto } from 'src/core/dtos/PaginationDto';

export abstract class TransactionRepository {
  abstract countByWallet(walletId: number): Promise<number>;
  abstract deleteById(
    transactionId: number,
    profileId: number,
  ): Promise<boolean>;
  abstract findById(id: number): Promise<Transaction | null>;
  abstract save(
    transaction: Transaction,
    profileId: number,
  ): Promise<Transaction>;
  abstract initialTransaction(
    walletId: number,
    amount: Amount,
    profileId: number,
  ): Promise<void>;
  abstract findByWallet(
    walletId: number,
    paginationOptions?: PaginationOptionsDto,
  ): Promise<Transaction[]>;
}
