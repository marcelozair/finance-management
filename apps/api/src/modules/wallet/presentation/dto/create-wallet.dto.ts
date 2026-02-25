import { IsEnum, IsString, IsNumber } from 'class-validator';

import { CurrencyEnum } from 'src/core/constant/currency.enum';
import { WalletTypeEnum } from 'src/shared/infrastructure/database/entities/wallet.entity';

export class CreateWalletDTO {
  @IsString()
  name: string;

  @IsNumber()
  initialBalance: number;

  @IsString()
  color: string;

  @IsEnum(CurrencyEnum)
  currency: CurrencyEnum;

  @IsEnum(WalletTypeEnum)
  walletType: WalletTypeEnum;

  // @IsOptional()
  // @IsInstance(ProfileEntity)
  // profile?: ProfileEntity;

  constructor(wallet: CreateWalletDTO) {
    Object.assign(this, wallet);
  }
}
