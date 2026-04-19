import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ResHandler } from 'src/shared/utils/response-handler';
import { AuthGuard } from 'src/infrastructure/security/AuthGuard';

import { CreateTransactionDTO } from './dtos/CreateTransactionDto';
import { GetTransactionsUseCase } from '../application/useCases/GetTransactionsUseCase';
import { CreateTransactionUseCase } from '../application/useCases/CreateTransactionUseCase';

@Controller('wallet/:walletId/transactions')
@UseGuards(AuthGuard)
export class TransactionController {
  @Inject()
  private readonly getTransactionsUseCase: GetTransactionsUseCase;

  @Inject()
  private readonly createTransactionUseCase: CreateTransactionUseCase;

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getTransactions(
    @Param('walletId') walletId: number,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    const response = await this.getTransactionsUseCase.execute(walletId, {
      limit: Number(limit),
      page: Number(page),
    });

    return ResHandler(response, 'Transactions obtained successfully');
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createTransaction(
    @Param('walletId') walletId: number,
    @Body() payload: CreateTransactionDTO,
  ) {
    const response = await this.createTransactionUseCase.execute(
      walletId,
      payload,
    );
    return ResHandler(response, 'Transaction created successfully');
  }
}
