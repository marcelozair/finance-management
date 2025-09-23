import { IsEnum, IsString } from 'class-validator';
import { CurrencyEnum } from 'src/core/constant/currency.enum';

export class CreateProfileDTO {
  @IsString()
  name: string;

  @IsString()
  color: string;

  @IsEnum(CurrencyEnum)
  currency: CurrencyEnum;
}
