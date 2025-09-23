import { Module } from '@nestjs/common';

import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { RecordRepository } from './record.repository';
import { WalletModule } from '../wallet/wallet.module';
import { RecordRepositoryProvider } from './entities/record.provider';
import { AuthContextModule } from '../auth-context/auth-context.module';

@Module({
  controllers: [RecordController],
  imports: [AuthContextModule, WalletModule],
  providers: [RecordService, RecordRepository, RecordRepositoryProvider],
})
export class RecordModule {}
