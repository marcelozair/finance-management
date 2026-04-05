import { ValueObject } from 'src/core/domain/ValueObject';

export enum WalletTypes {
  SAVE = 'Save',
  CREDIT = 'Credit',
  DEBIT = 'Debit',
  CASH = 'Cash',
}

export class WalletType extends ValueObject<WalletTypes> {
  constructor(value: WalletTypes) {
    super(value);
    this.validate();
  }

  private validate(): void {
    if (!Object.values(WalletTypes).includes(this.value)) {
      throw new Error(
        `Invalid Wallet Type: ${this.value}. Allowed types are DEBIT, CREDIT, SAVE, CASH.`,
      );
    }
  }

  /**
   * Helper methods to support Business Rules
   * (e.g., restricting Transfers to Debit only)
   */
  get isDebit(): boolean {
    return this.value === WalletTypes.DEBIT;
  }

  get isCredit(): boolean {
    return this.value === WalletTypes.CREDIT;
  }

  /**
   * Factory methods for cleaner syntax in the Application layer
   */
  static createDebit(): WalletType {
    return new WalletType(WalletTypes.DEBIT);
  }

  static createCredit(): WalletType {
    return new WalletType(WalletTypes.CREDIT);
  }
}
