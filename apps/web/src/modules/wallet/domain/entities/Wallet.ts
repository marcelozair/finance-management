import { Amount } from "../../../../core/domain/vo/Amount";
import type { Currency } from "../../../../core/domain/vo/Currency";

export class Wallet {
  constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly type: string,
    private balance: Amount,
    private readonly currency: Currency,
    private readonly color: string,
  ) {}

  get _id() {
    return this.id;
  }

  get _name() {
    return this.name;
  }

  get _type() {
    return this.type;
  }

  get _balance() {
    return this.balance;
  }

  get _color() {
    return this.color;
  }

  get _currency() {
    return this.currency;
  }

  cloneWithBalance(balance: Amount) {
    return new Wallet(
      this._id,
      this._name,
      this._type,
      balance,
      this._currency,
      this.color,
    );
  }
}
