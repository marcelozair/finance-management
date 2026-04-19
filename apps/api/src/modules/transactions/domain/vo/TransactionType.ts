import { ValueObject } from 'src/core/domain/ValueObject';

export enum TransactionEnum {
  INCOME = 'income',
  EXPENSE = 'expense',
  TRANSFER = 'transfer',
}

export class TransactionType extends ValueObject<string> {
  constructor(value: string) {
    super(value);

    if (!TransactionType.isValid(value)) {
      throw new Error('Invalid transaction type');
    }
  }

  private static isValid(value: string): boolean {
    return Object.values(TransactionEnum).includes(value as any);
  }

  get isIncome() {
    return this.getValue() === TransactionEnum.INCOME.toString();
  }

  get isExpense() {
    return this.getValue() === TransactionEnum.EXPENSE.toString();
  }

  get isTransfer() {
    return this.getValue() === TransactionEnum.TRANSFER.toString();
  }
}
