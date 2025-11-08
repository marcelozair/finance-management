import { IsString, IsNumber } from 'class-validator';

export class VerifyCodeDTO {
  @IsNumber()
  userId: number;

  @IsString()
  token: string;
}
