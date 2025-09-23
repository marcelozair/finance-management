import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { RecordRepository } from './record.repository';
import { CreateRecordDTO } from './dto/create-record.dto';
import { WalletRepository } from '../wallet/wallet.repository';
import { RecordTypeEnum } from './entities/record.entity';

@Injectable()
export class RecordService {
  @Inject(RecordRepository)
  private readonly recordRepository: RecordRepository;

  @Inject(WalletRepository)
  private readonly walletRepository: WalletRepository;

  async create(record: CreateRecordDTO, walletId: number) {
    const wallet = await this.walletRepository.findById(walletId);

    if (!wallet) {
      throw new BadRequestException(
        'The wallet related with this record does not exist',
      );
    }

    const createdRecord = await this.recordRepository.create({
      ...record,
      wallet,
    });

    if (record.type === RecordTypeEnum.Expense) {
      wallet.currentBalance = wallet.currentBalance - record.amount;
    } else if (record.type === RecordTypeEnum.Income) {
      wallet.currentBalance = wallet.currentBalance + record.amount;
    } else {
      // # TODO pending work on this useCase
    }

    return createdRecord;
  }
}
