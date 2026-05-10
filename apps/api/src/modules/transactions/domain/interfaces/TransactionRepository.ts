import { PaginationOptionsDto } from 'src/core/dtos/PaginationDto';
import { Amount } from '../../../wallets/domain/vo/Amount';
import { Transaction } from '../entities/Transaction';

export abstract class TransactionRepository {
  abstract countByWallet(walletId: number): Promise<number>;
  abstract deleteById(transactionId: number): Promise<boolean>;
  abstract findById(id: number): Promise<Transaction | null>;
  abstract save(transaction: Transaction): Promise<Transaction>;
  abstract initialTransaction(walletId: number, amount: Amount): Promise<void>;
  abstract findByWallet(
    walletId: number,
    paginationOptions?: PaginationOptionsDto,
  ): Promise<Transaction[]>;
}
