import { Amount } from '../../domain/vo/Amount';
import { Currency } from '../../domain/vo/Currency';
import { Wallet } from '../../domain/entities/Wallet';
import { WalletColor } from '../../domain/vo/WalletColor';
import { WalletName } from '../../domain/vo/WalletName';
import { WalletType, WalletTypes } from '../../domain/vo/WalletType';
import { WalletDto } from '../../presentation/dtos/WalletDto';
import { WalletEntity } from 'src/infrastructure/database/entities/WalletEntity';

export class WalletMapper {
  static toDTO(wallet: Wallet): WalletDto {
    return {
      id: wallet._id,
      name: wallet._name,
      color: wallet._color,
      type: wallet._type,
      currency: wallet._currency,
      balance: wallet._balance,
      creditLine: wallet._creditLine ? wallet._creditLine : null,
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
      walletEntity.creditLine
        ? new Amount(Number(walletEntity.creditLine))
        : null,
    );

    return wallet;
  }
}
