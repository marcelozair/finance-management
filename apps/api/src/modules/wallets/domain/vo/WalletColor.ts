import { ValueObject } from 'src/core/domain/ValueObject';

export class WalletColor extends ValueObject<string> {
  private readonly color: string;
  private static readonly HEX_FORMAT = /^#([A-Fa-f0-9]{3}){1,2}$/;

  constructor(value: string) {
    super(value);

    this.validate(value);
    this.color = value.toUpperCase();
  }

  private validate(color: string): void {
    if (!WalletColor.HEX_FORMAT.test(color)) {
      throw new Error(
        `Invalid color format: ${color}. Must be a valid Hex string (e.g., #FFFFFF).`,
      );
    }
  }

  get hex(): string {
    return this.color;
  }
}
