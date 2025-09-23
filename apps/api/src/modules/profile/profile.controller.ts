import {
  Body,
  Post,
  Inject,
  HttpCode,
  Controller,
  HttpStatus,
  UseGuards,
  Put,
} from '@nestjs/common';

import { AuthGuard } from '../auth/presentation/auth.guard';
import { UserDTO } from '../user/domain/dto/user.dto';
import { ProfileService } from './profile.service';
import { User } from 'src/core/decorators/user.decorator';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { UpdateProfileDTO } from './dto/update-profile.dto';
import { ResHandler } from 'src/core/utils/response-handler';
import { WalletService } from '../wallet/wallet.service';
import { CreateWalletDTO } from '../wallet/dto/create-wallet.dto';
import { WalletTypeEnum } from '../wallet/entities/wallet.entity';

@Controller('profile')
export class ProfileController {
  @Inject(ProfileService)
  private readonly profileService: ProfileService;

  @Inject(WalletService)
  private readonly walletService: WalletService;

  @Post('create')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@User() user: UserDTO, @Body() body: CreateProfileDTO) {
    const profile = await this.profileService.create(body, user);

    const wallet = new CreateWalletDTO({
      walletType: WalletTypeEnum.CASH,
      color: '#13af3f',
      currency: body.currency,
      initialBalance: 0,
      name: 'Cash',
    });

    await this.walletService.create(wallet, profile);

    return ResHandler(profile, 'Profile created successfully');
  }

  @Put('update')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(@Body() body: UpdateProfileDTO) {
    const profile = await this.profileService.update(body);
    return ResHandler(profile, 'Profile updated successfully');
  }
}
