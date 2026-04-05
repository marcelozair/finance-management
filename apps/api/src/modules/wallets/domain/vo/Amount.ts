import { ValueObject } from 'src/core/domain/ValueObject';

export class Amount extends ValueObject<number> {
  constructor(value: number) {
    super(value);

    this.validate(value);
  }

  validate(value: number) {
    if (typeof value !== 'number') {
      throw Error('Amount must be a number');
    }

    if (value < 0) {
      throw Error('Amount cannot be negative');
    }

    if (Number.isNaN(value)) {
      throw Error('Amount must be a valid number');
    }
  }
}
