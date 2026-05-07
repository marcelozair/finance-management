import { ValueObject } from 'src/core/domain/vo/ValueObject';

export class Amount extends ValueObject<number> {
  constructor(value: number) {
    if (!Amount.isValid(value)) {
      throw new Error('Invalid amount');
    }
    super(value);
  }

  static isValid(value: number): boolean {
    return typeof value === 'number' && !Number.isNaN(value);
  }

  // ---- Arithmetic ----
  add(amount: Amount): Amount {
    return new Amount(this.value + amount.getValue());
  }

  subtract(amount: Amount): Amount {
    return new Amount(this.value - amount.getValue());
  }

  multiply(factor: number): Amount {
    return new Amount(this.value * factor);
  }

  divide(divisor: number): Amount {
    if (divisor === 0) {
      throw new Error('Cannot divide by zero');
    }
    return new Amount(this.value / divisor);
  }

  // ---- Comparison ----
  equals(amount: Amount): boolean {
    return this.value === amount.getValue();
  }

  greaterThan(amount: Amount): boolean {
    return this.value > amount.getValue();
  }

  lessThan(amount: Amount): boolean {
    return this.value < amount.getValue();
  }

  // ---- Utility ----
  isZero(): boolean {
    return this.value === 0;
  }

  isPositive(): boolean {
    return this.value > 0;
  }

  isNegative(): boolean {
    return this.value < 0;
  }

  abs(): Amount {
    return new Amount(Math.abs(this.value));
  }

  // Optional: formatting
  toString(): string {
    return this.value.toString();
  }
}
