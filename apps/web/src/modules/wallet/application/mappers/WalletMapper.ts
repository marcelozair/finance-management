import { Wallet } from "../../domain/entities/Wallet";
import { Amount } from "../../domain/vo/Amount";
import { Currency } from "../../domain/vo/Currency";
import type { WalletDto } from "../../infrastructure/interfaces/WalletRepositoryDtos";

export class WalletMapper {
  static toDomain(wallet: WalletDto): Wallet {
    return new Wallet(
      wallet.id,
      wallet.name,
      wallet.type,
      new Amount(wallet.balance),
      wallet.formattedBalance,
      new Currency(wallet.currency),
      wallet.color,
    );
  }
}
