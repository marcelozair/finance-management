import { ValueObject } from 'src/core/domain/ValueObject';

export const TransactionCategoryEnum = {
  INITAL: 'initial',
  FOOD: 'food',
  TRANSPORT: 'transport',
  ENTERTAINMENT: 'entertainment',
  HEALTH: 'health',
  EDUCATION: 'education',
  UTILITIES: 'utilities',
  SALARY: 'salary',
  OTHER: 'other',
} as const;

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
