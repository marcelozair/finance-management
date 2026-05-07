import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { CurrencyEnum } from 'src/shared/constant/CurrencyEnum';

export class UpdateProfileDTO {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsEnum(CurrencyEnum)
  currency?: string;
}
