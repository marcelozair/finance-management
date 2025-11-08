import { IsEmail, Matches, IsString, Length } from 'class-validator';

export class SignUpDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @Matches(new RegExp(/^\+\d{1,3}\d{6,12}$/))
  phone: string;

  @IsString()
  @Length(12)
  password: string;
}
