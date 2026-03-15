import { CurrencyEnum } from 'src/core/constant/currency.enum';
import { ValueObject } from 'src/core/domain/ValueObject';
import { InvalidCurrencyError } from '../exceptions/InvalidCurrencyError';

export class Currency extends ValueObject<string> {
  constructor(value: string) {
    super(value);

    if (!Currency.isValid(value)) {
      throw new InvalidCurrencyError();
    }
  }

  private static isValid(value: string): boolean {
    const currencies = Object.values(CurrencyEnum);
    if (!currencies.includes(value as CurrencyEnum)) return false;

    return true;
  }
}
