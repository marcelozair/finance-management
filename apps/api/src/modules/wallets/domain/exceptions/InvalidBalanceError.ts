export class InvalidBalanceError extends Error {
  constructor(message?: string) {
    super(message || 'Invalid balance value, can not update current balance');
  }
}
