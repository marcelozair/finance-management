import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CreateWalletDTO } from './dtos/CreateWalletDto';
import { ResHandler } from 'src/core/utils/response-handler';
import { Profile } from 'src/core/decorators/ProfileDecorator';
import { CreateWalletUseCase } from '../application/useCases/CreateWalletUseCase';
import { GetWalletUseCase } from '../application/useCases/GetWalletsUseCase';
import { AuthGuard } from 'src/shared/infrastructure/security/AuthGuard';

@Controller('wallet')
@UseGuards(AuthGuard)
export class WalletController {
  @Inject()
  private readonly createWalletUseCase: CreateWalletUseCase;

  @Inject()
  private readonly getWalletsUseCase: GetWalletUseCase;

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
}
