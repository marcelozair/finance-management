import { IsEnum, IsInstance, IsNumber, IsString } from 'class-validator';

import { WalletEntity } from 'src/modules/wallet/entities/wallet.entity';
import { RecordCategoryEnum, RecordTypeEnum } from '../entities/record.entity';

export class CreateRecordDTO {
  @IsString()
  concept: string;

  @IsEnum(RecordCategoryEnum)
  category: RecordCategoryEnum;

  @IsEnum(RecordTypeEnum)
  type: RecordTypeEnum;

  @IsNumber()
  amount: number;

  @IsInstance(WalletEntity)
  wallet?: WalletEntity;
}
