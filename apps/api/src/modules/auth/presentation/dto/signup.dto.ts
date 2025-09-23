import { IsEmail, IsString } from 'class-validator';

export class SignUpDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
