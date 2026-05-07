interface CurrencyConfigType {
  [key: string]: {
    label: string;
    locale: string;
    currency: string;
  };
}

export const CurrencyConfig: CurrencyConfigType = {
  USD: {
    label: "US Dollar",
    locale: "en-US",
    currency: "USD",
  },
  EUR: {
    label: "Euro",
    locale: "de-DE", // or "fr-FR" depending on your preference
    currency: "EUR",
  },
  GBP: {
    label: "British Pound",
    locale: "en-GB",
    currency: "GBP",
  },
  PEN: {
    label: "Peruvian Sol",
    locale: "es-PE",
    currency: "PEN",
  },
  MXN: {
    label: "Mexican Peso",
    locale: "es-MX",
    currency: "MXN",
  },
  JPY: {
    label: "Japanese Yen",
    locale: "ja-JP",
    currency: "JPY",
  },
} as const;

export const AvailableCurrencies = Object.keys(CurrencyConfig);
export type CurrencyKey = keyof typeof CurrencyConfig;
export type Currency = (typeof CurrencyConfig)[CurrencyKey];
