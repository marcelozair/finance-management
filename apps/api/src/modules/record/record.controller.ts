import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../auth/presentation/auth.guard';
import { RecordService } from './record.service';
import { CreateRecordDTO } from './dto/create-record.dto';

@Controller('records')
export class RecordController {
  @Inject(RecordService)
  private readonly recordService: RecordService;

  @Post('wallet/{wallet-id}')
  @UseGuards(AuthGuard)
  create(
    @Body() record: CreateRecordDTO,
    @Param('wallet-id') walletId: number,
  ) {
    return this.recordService.create(record, walletId);
  }
}
