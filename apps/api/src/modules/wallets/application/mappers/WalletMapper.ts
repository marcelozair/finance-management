import { Wallet } from '../../domain/entities/Wallet';
import { Amount } from '../../domain/vo/Amount';
import { Currency } from '../../domain/vo/Currency';
import { WalletName } from '../../domain/vo/WalletName';
import { WalletDto } from '../../presentation/dtos/WalletDto';
import { WalletEntity } from 'src/shared/infrastructure/database/entities/wallet.entity';

export class WalletMapper {
  static toDTO(wallet: Wallet): WalletDto {
    return {
      id: wallet._id,
      name: wallet._name,
      color: wallet._color,
      type: wallet._walletType,
      currency: wallet._currency,
      balance: wallet._currentBalance,
    };
  }

  static entityToDomain(walletEntity: WalletEntity): Wallet {
    const wallet = new Wallet(
      walletEntity.id,
      new WalletName(walletEntity.name),
      walletEntity.walletType,
      new Amount(walletEntity.initialBalance),
      new Amount(walletEntity.currentBalance),
      new Currency(walletEntity.currency),
      walletEntity.color,
    );

    return wallet;
  }
}
