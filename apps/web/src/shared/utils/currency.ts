import type { Amount } from "@core/domain/vo/Amount";
import { CurrencyConfig } from "../../shared/const/currencyEnum";
import type { Currency } from "@core/domain/vo/Currency";

export const formatMoney = (amount: Amount, currencyValue: Currency) => {
  const { locale, currency } = CurrencyConfig[currencyValue.getValue()];

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount.getValue());
};
