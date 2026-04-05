import { Amount } from '../vo/Amount';
import { Transaction } from '../entities/Transaction';

export abstract class TransactionRepository {
  abstract save(transaction: Transaction): Promise<Transaction>;
  abstract initialTransaction(walletId: number, amount: Amount): Promise<void>;
  abstract findByWallet(walletId: number): Promise<Transaction[]>;
  abstract findById(id: number): Promise<Transaction | null>;
}
