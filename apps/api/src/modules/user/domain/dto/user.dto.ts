import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UserDTO {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  constructor(partial: Partial<UserDTO>) {
    Object.assign(this, partial);
  }
}
