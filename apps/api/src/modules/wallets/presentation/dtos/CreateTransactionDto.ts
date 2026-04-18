import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { TransactionEnum } from '../../domain/vo/TransactionType';
import { TransactionCategoryEnum } from '../../domain/vo/TransactionCategory';

export class CreateTransactionDTO {
  @IsString()
  concept: string;

  @IsNumber()
  amount: number;

  @IsEnum(TransactionEnum)
  type: string;

  @IsEnum(TransactionCategoryEnum)
  category: string;

  @IsNumber()
  @IsOptional()
  destinationWalletId?: number | null;
}
