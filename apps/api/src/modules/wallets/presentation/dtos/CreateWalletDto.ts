import { IsEnum, IsString, IsNumber, IsOptional } from 'class-validator';

import { WalletTypes } from '../../domain/vo/WalletType';
import { CurrencyEnum } from 'src/shared/constant/CurrencyEnum';

export class CreateWalletDTO {
  @IsString()
  name: string;

  @IsNumber()
  initialBalance: number;

  @IsString()
  color: string;

  @IsEnum(CurrencyEnum)
  currency: CurrencyEnum;

  @IsEnum(WalletTypes)
  walletType: WalletTypes;

  @IsOptional()
  @IsNumber()
  creditLine?: number;
}
