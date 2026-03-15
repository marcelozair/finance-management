export class TOTPInternalError extends Error {
  constructor(message?: string) {
    super(message || 'Internal server error, please try again later');
  }
}
