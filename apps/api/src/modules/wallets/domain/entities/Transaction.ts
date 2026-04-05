import { Amount } from '../vo/Amount';
import { TransactionType } from '../vo/TransactionType';
import { TransactionCategory } from '../vo/TransactionCategory';

export class Transaction {
  constructor(
    private readonly id: number,
    private readonly walletId: number,
    private readonly amount: Amount,
    private readonly concept: string,
    private readonly type: TransactionType,
    private readonly category: TransactionCategory,
    private readonly destinationWalletId: number | null = null,
  ) {
    this.validateBusinessRules();
  }

  validateBusinessRules() {
    // Rule: Transfers transaction must have a destination
    if (this.type.isTransfer && !this.destinationWalletId) {
      throw new Error(
        'Destination wallet ID is required for transfer transactions',
      );
    }

    // Rule: Amounts must always be positive
    if (this.amount.getValue() <= 0) {
      throw new Error('Transaction amount must be a positive value.');
    }
  }

  get _id() {
    return this.id;
  }

  get _walletId() {
    return this.walletId;
  }

  get _destinationWalletId() {
    return this.destinationWalletId;
  }

  get _category() {
    return this.category.getValue();
  }

  get _amount() {
    return this.amount.getValue();
  }

  get _concept() {
    return this.concept;
  }

  get _type() {
    return this.type.getValue();
  }
}
