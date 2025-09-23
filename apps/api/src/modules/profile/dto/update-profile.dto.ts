import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CurrencyEnum } from 'src/core/constant/currency.enum';

export class UpdateProfileDTO {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsEnum(CurrencyEnum)
  currency?: CurrencyEnum;
}
