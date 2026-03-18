import { defaultLocale } from "src/core/const/locales";
import type { Amount } from "../vo/Amount";
import type { Currency } from "../vo/Currency";

export class Wallet {
  private readonly formattedBalance: string;

  constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly type: string,
    private readonly balance: Amount,
    private readonly currency: Currency,
    private readonly color: string,
    private readonly locale: string = defaultLocale,
  ) {
    this.formattedBalance = new Intl.NumberFormat(this.locale, {
      style: "currency",
      currency: this.currency.getValue(),
    }).format(this.balance.getValue());
  }

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

  get _formattedBalance() {
    return this.formattedBalance;
  }
}
