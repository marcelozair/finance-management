import { ValueObject } from "src/core/domain/ValueObject";
import { AvailableCurrencies } from "src/core/const/currencyEnum";
import { InvalidCurrencyError } from "../exceptions/InvalidCurrencyError";

export class Currency extends ValueObject<string> {
  constructor(value: string) {
    super(value);

    if (!Currency.isValid(value)) {
      throw new InvalidCurrencyError();
    }
  }

  private static isValid(value: string): boolean {
    if (!AvailableCurrencies.includes(value)) return false;
    return true;
  }
}
