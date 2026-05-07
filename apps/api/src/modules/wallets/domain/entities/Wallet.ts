import { Amount } from '../vo/Amount';
import { Currency } from '../vo/Currency';
import { WalletName } from '../vo/WalletName';
import { WalletColor } from '../vo/WalletColor';
import { WalletType } from '../vo/WalletType';

// Business Rules to enforce in the Wallet Entity:
// 1. Wallet name must be unique (enforced at the repository level)
// 2. Wallet type must be either DEBIT or CREDIT (enforced by WalletType VO)
// 3. Balance must be calculated based on transactions (enforced in the Application layer when fetching wallet details)
// 4. Wallet color must be a valid Hex string (enforced by WalletColor VO)
// 5. Currency must be a valid ISO code (enforced by Currency VO)

// Calculate the balance by summing all transactions related to this wallet

export class Wallet {
  constructor(
    private readonly id: number,
    private readonly name: WalletName,
    private readonly type: WalletType,
    private readonly currency: Currency,
    private readonly balance: Amount,
    private readonly color: WalletColor,
    private readonly creditLine: Amount | null,
  ) {
    this.validate();
  }

  private validate(): void {
    if (this.type.isCredit && !this.creditLine) {
      throw new Error('Credit line is required for credit wallets.');
    }
  }

  static forCreate(
    name: WalletName,
    walletType: WalletType,
    currency: Currency,
    color: WalletColor,
    creditLine: Amount | null,
  ) {
    return new Wallet(
      0,
      name,
      walletType,
      currency,
      new Amount(0),
      color,
      creditLine,
    );
  }

  get _id() {
    return this.id;
  }

  get _balance() {
    return this.balance.getValue();
  }

  get _name() {
    return this.name.getValue();
  }

  get _type() {
    return this.type.getValue();
  }

  get _color() {
    return this.color.getValue();
  }

  get _currency() {
    return this.currency.getValue();
  }

  get _creditLine() {
    return this.creditLine ? this.creditLine.getValue() : null;
  }
}
