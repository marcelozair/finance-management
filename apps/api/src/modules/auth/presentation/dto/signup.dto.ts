import { IsEmail, Matches, IsString, Length, IsEnum } from 'class-validator';
import { CurrencyEnum } from 'src/core/constant/currency.enum';

export class SignUpDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @Matches(new RegExp(/^\+\d{1,3}\d{6,12}$/))
  phone: string;

  @IsEnum(CurrencyEnum)
  currency: string;

  @IsString()
  @Length(12)
  password: string;
}
