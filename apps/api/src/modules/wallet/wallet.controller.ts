import {
  Get,
  Body,
  Post,
  Inject,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
} from '@nestjs/common';

import { AuthGuard } from '../auth/presentation/auth.guard';
import { WalletService } from './wallet.service';
import { ProfileDTO } from '../profile/dto/profile.dto';
import { ResHandler } from 'src/core/utils/response-handler';
import { Profile } from 'src/core/decorators/profile.decorator';
import { CreateWalletDTO } from './dto/create-wallet.dto';

@Controller('wallet')
export class WalletController {
  @Inject(WalletService)
  private readonly walletServcie: WalletService;

  @Post('create')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Profile() profile: ProfileDTO,
    @Body() wallet: CreateWalletDTO,
  ) {
    const response = await this.walletServcie.create(wallet, profile);
    return ResHandler(response);
  }

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getAll(@Profile() profile: ProfileDTO) {
    const response = await this.walletServcie.getAll(profile);
    return ResHandler(response);
  }
}
