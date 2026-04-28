import { ValueObject } from "src/core/domain/vo/ValueObject";
import { AvailableCurrencies } from "@shared/const/currencyEnum";
import { InvalidCurrencyError } from "../../../modules/wallet/domain/exceptions/InvalidCurrencyError";

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
