import { Inject, Injectable } from '@nestjs/common';

import {
  RecordRepositoryEntity,
  RecordRepositoryName,
} from './entities/record.provider';
import { CreateRecordDTO } from './dto/create-record.dto';
import { RecordEntity } from './entities/record.entity';

@Injectable()
export class RecordRepository {
  @Inject(RecordRepositoryName)
  private readonly recordRepository: RecordRepositoryEntity;

  create(record: CreateRecordDTO): Promise<RecordEntity> {
    const recordPayload = this.recordRepository.create(record);
    return this.recordRepository.save(recordPayload);
  }
}
