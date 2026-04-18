import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CreateWalletDTO } from './dtos/CreateWalletDto';
import { ResHandler } from 'src/core/utils/response-handler';
import { Profile } from 'src/core/decorators/ProfileDecorator';
import { CreateTransactionDTO } from './dtos/CreateTransactionDto';
import { AuthGuard } from 'src/shared/infrastructure/security/AuthGuard';
import { GetWalletUseCase } from '../application/useCases/GetWalletsUseCase';
import { CreateWalletUseCase } from '../application/useCases/CreateWalletUseCase';
import { GetTransactionsUseCase } from '../application/useCases/GetTransactionsUseCase';
import { CreateTransactionUseCase } from '../application/useCases/CreateTransactionUseCase';

@Controller('wallet')
@UseGuards(AuthGuard)
export class WalletController {
  @Inject()
  private readonly createWalletUseCase: CreateWalletUseCase;

  @Inject()
  private readonly getWalletsUseCase: GetWalletUseCase;

  @Inject()
  private readonly getTransactionsUseCase: GetTransactionsUseCase;

  @Inject()
  private readonly createTransactionUseCase: CreateTransactionUseCase;

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(@Profile() profileId: number, @Body() body: CreateWalletDTO) {
    const wallet = await this.createWalletUseCase.execute(profileId, body);
    return ResHandler(wallet, 'Wallet created successfully');
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAll(@Profile() profileId: number) {
    const response = await this.getWalletsUseCase.execute(profileId);
    return ResHandler(response, 'Wallet obtained successfully');
  }

  @Get('/:walletId/transactions')
  @HttpCode(HttpStatus.OK)
  async getTransactions(@Param('walletId') walletId: number) {
    const response = await this.getTransactionsUseCase.execute(walletId);
    return ResHandler(response, 'Transactions obtained successfully');
  }

  @Post('/:walletId/transactions')
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
