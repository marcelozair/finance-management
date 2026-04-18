import { ValueObject } from 'src/core/domain/ValueObject';

export enum TransactionCategoryEnum {
  INITAL = 'initial',
  FOOD = 'food',
  TRANSPORT = 'transport',
  ENTERTAINMENT = 'entertainment',
  HEALTH = 'health',
  EDUCATION = 'education',
  UTILITIES = 'utilities',
  SALARY = 'salary',
  OTHER = 'other',
}

export class TransactionCategory extends ValueObject<string> {
  constructor(value: string) {
    super(value);

    if (!TransactionCategory.isValid(value)) {
      throw new Error('Invalid transaction category');
    }
  }

  private static isValid(value: string): boolean {
    return Object.values(TransactionCategoryEnum).includes(value as any);
  }
}
