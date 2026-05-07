export class InvalidTransferTransaction extends Error {
  constructor() {
    super(
      'Invalid transfer transaction schema, please ensure you are aligned with the correct transaction structure',
    );
  }
}
