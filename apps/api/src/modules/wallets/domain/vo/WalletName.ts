import { ValueObject } from 'src/core/domain/vo/ValueObject';

export class WalletName extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    if (!WalletName.isValid(value)) {
      throw new Error('Invalid name format');
    }
  }

  private static isValid(value: string): boolean {
    if (value.length > 20) return false;
    return true;
  }
}
