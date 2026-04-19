import { TransactionType } from 'src/modules/transactions/domain/vo/TransactionType';
import { Transaction } from '../../../transactions/domain/entities/Transaction';
import { Amount } from '../vo/Amount';
import { WalletTypes } from '../vo/WalletType';

/**
 * WalletBalanceService — Domain Service
 *
 * Responsibility: Calculate the net balance of a wallet
 * based on its associated transactions.
 *
 * Balance Rules:
 *  - INCOME                 → increases balance  (+amount)
 *  - EXPENSE                → decreases balance  (-amount)
 *  - TRANSFER (source)      → decreases balance  (-amount) [Debit/Save/Cash only]
 *  - TRANSFER (destination) → increases balance  (+amount) [Debit/Save/Cash only]
 *
 * Business Rule:
 *  - Credit wallets do NOT support transfer transactions.
 */
export class WalletBalanceService {
  /**
   * Computes the net balance for a given wallet.
   *
   * @param walletId     The ID of the wallet to compute the balance for.
   * @param walletType   The type of the wallet (Credit, Debit, Save, Cash).
   * @param transactions All transactions associated with the wallet,
   *                     including incoming transfers where this wallet
   *                     is the destination.
   * @returns The computed net balance.
   * @throws Error if a Credit wallet contains a transfer transaction.
   */
  static calculate(
    walletId: number,
    walletType: WalletTypes,
    transactions: Transaction[],
  ): Amount {
    return transactions.reduce((balance, transaction) => {
      if (transaction._type.equals(new TransactionType('income'))) {
        return balance.add(transaction._amount);
      }

      if (transaction._type.equals(new TransactionType('expense'))) {
        return balance.subtract(transaction._amount);
      }

      if (transaction._type.equals(new TransactionType('transfer'))) {
        // Business Rule: Credit wallets do not support transfers
        if (walletType === WalletTypes.CREDIT) {
          throw new Error(
            `Business Rule Violation: Credit wallet (id: ${walletId}) cannot have transfer transactions.`,
          );
        }

        // Debit the source wallet
        if (transaction._walletId === walletId) {
          return balance.subtract(transaction._amount);
        }

        // Credit the destination wallet
        if (transaction._destinationWalletId === walletId) {
          return balance.add(transaction._amount);
        }
      }

      return balance;
    }, new Amount(0));
  }
}
