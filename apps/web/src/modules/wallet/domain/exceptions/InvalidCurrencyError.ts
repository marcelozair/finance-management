export class InvalidCurrencyError extends Error {
  constructor(message?: string) {
    super(
      message ||
        "Invalid currency, please check available currency before select one",
    );
  }
}
