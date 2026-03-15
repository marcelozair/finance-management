import { IsEnum, IsString, IsNumber } from 'class-validator';

import { CurrencyEnum } from 'src/core/constant/currency.enum';

export enum WalletTypeEnum {
  Debit = 'Debit',
  Credit = 'Credit',
  Cash = 'Cash',
}

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
}
