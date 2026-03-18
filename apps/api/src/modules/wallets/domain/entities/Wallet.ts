import { Amount } from '../vo/Amount';
import { Currency } from '../vo/Currency';
import { WalletName } from '../vo/WalletName';
import { InvalidBalanceError } from '../exceptions/InvalidBalanceError';

export class Wallet {
  constructor(
    private readonly id: number,
    private readonly name: WalletName,
    private readonly walletType: string,
    private initialBalance: Amount,
    private currentBalance: Amount,
    private readonly currency: Currency,
    private readonly color: string,
  ) {}

  updateCurrentBalance(newBalance: Amount) {
    if (newBalance.getValue() <= 0) throw new InvalidBalanceError();
    this.currentBalance = newBalance;
  }

  static forCreate(
    name: WalletName,
    walletType: string,
    initialBalance: Amount,
    currency: Currency,
    color: string,
  ) {
    return new Wallet(
      0,
      name,
      walletType,
      initialBalance,
      initialBalance,
      currency,
      color,
    );
  }

  get _id() {
    return this.id;
  }

  get _name() {
    return this.name.getValue();
  }

  get _walletType() {
    return this.walletType;
  }

  get _initialBalance() {
    return this.initialBalance.getValue();
  }

  get _color() {
    return this.color;
  }

  get _currency() {
    return this.currency.getValue();
  }

  get _currentBalance() {
    return this.currentBalance.getValue();
  }
}
