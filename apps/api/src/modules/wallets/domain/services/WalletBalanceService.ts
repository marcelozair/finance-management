import {
  Transaction,
  ExpenseTransaction,
  IncomeTransaction,
  TransferTransaction,
} from '../../../transactions/domain/entities/Transaction';

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
    const balance = transactions.reduce((balance, transaction) => {
      if (transaction._type.equals(IncomeTransaction)) {
        return balance.add(transaction._amount);
      }

      if (transaction._type.equals(ExpenseTransaction)) {
        return balance.subtract(transaction._amount);
      }

      if (transaction._type.equals(TransferTransaction)) {
        // Business Rule: Credit wallets do not support transfers
        if (walletType === WalletTypes.CREDIT) {
          throw new Error(
            `Business Rule Violation: Credit wallet (id: ${walletId}) cannot have transfer transactions.`,
          );
        }

        // When walletId is different to the destination
        // it means this is the source account
        if (
          transaction._walletId === walletId &&
          transaction._destinationWalletId != walletId
        ) {
          return balance.subtract(transaction._amount);
        }

        // Destination account
        if (transaction._destinationWalletId === walletId) {
          return balance.add(transaction._amount);
        }
      }

      return balance;
    }, new Amount(0));

    if (walletType === WalletTypes.CREDIT && balance.getValue() > 0) {
      throw new Error(
        `Business Rule Violation: Credit wallet (id: ${walletId}) cannot have a positive balance.`,
      );
    }

    return balance;
  }
}
