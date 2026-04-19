import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { TransactionEnum } from '../../domain/vo/TransactionType';

export class CreateTransactionDTO {
  @IsString()
  concept: string;

  @IsNumber()
  amount: number;

  @IsEnum(TransactionEnum)
  type: string;

  @IsString()
  date: string;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  subCategoryId: number;

  @IsNumber()
  @IsOptional()
  destinationWalletId?: number | null;
}
