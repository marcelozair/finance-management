import { Currency } from 'src/modules/wallets/domain/vo/Currency';

export class Profile {
  constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly color: string,
    private readonly currency: Currency,
    private readonly userId: number,
  ) {}

  static forCreate(
    name: string,
    color: string,
    currency: Currency,
    userId: number,
  ) {
    return new Profile(0, name, color, currency, userId);
  }

  get _id() {
    return this.id;
  }

  get _name() {
    return this.name;
  }

  get _currency() {
    return this.currency.getValue();
  }

  get _userId() {
    return this.userId;
  }

  get _color() {
    return this.color;
  }
}
