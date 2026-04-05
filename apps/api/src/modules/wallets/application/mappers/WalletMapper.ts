import { Wallet } from '../../domain/entities/Wallet';
import { Amount } from '../../domain/vo/Amount';
import { Currency } from '../../domain/vo/Currency';
import { WalletColor } from '../../domain/vo/WalletColor';
import { WalletName } from '../../domain/vo/WalletName';
import { WalletType, WalletTypes } from '../../domain/vo/WalletType';
import { WalletDto } from '../../presentation/dtos/WalletDto';
import { WalletEntity } from 'src/shared/infrastructure/database/entities/wallet.entity';

export class WalletMapper {
  static toDTO(wallet: Wallet, balance: number = 0): WalletDto {
    return {
      id: wallet._id,
      name: wallet._name,
      color: wallet._color,
      type: wallet._type,
      currency: wallet._currency,
      balance,
    };
  }

  static entityToDomain(walletEntity: WalletEntity): Wallet {
    const wallet = new Wallet(
      walletEntity.id,
      new WalletName(walletEntity.name),
      new WalletType(walletEntity.type as WalletTypes),
      new Currency(walletEntity.currency),
      new Amount(0), // Assuming balance is calculated separately
      new WalletColor(walletEntity.color),
    );

    return wallet;
  }
}
