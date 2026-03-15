import { ValueObject } from 'src/core/domain/ValueObject';

export class Amount extends ValueObject<number> {
  constructor(value: number) {
    super(value);
  }

  static isValid(value: number) {
    if (Number.isNaN(value)) return false;
    return true;
  }
}
