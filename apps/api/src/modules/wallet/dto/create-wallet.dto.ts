import {
  IsEnum,
  IsString,
  IsNumber,
  IsOptional,
  IsInstance,
} from 'class-validator';

import { WalletTypeEnum } from '../entities/wallet.entity';
import { CurrencyEnum } from 'src/core/constant/currency.enum';
import { ProfileEntity } from 'src/modules/profile/entities/profile.entity';

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

  @IsOptional()
  @IsInstance(ProfileEntity)
  profile?: ProfileEntity;

  constructor(wallet: CreateWalletDTO) {
    Object.assign(this, wallet);
  }
}
