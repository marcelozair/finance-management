import type { Amount } from "src/modules/wallet/domain/vo/Amount";
import { CurrencyConfig } from "../../shared/const/currencyEnum";
import type { Currency } from "src/modules/wallet/domain/vo/Currency";

export const formatMoney = (amount: Amount, currencyValue: Currency) => {
  const { locale, currency } = CurrencyConfig[currencyValue.getValue()];

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount.getValue());
};
