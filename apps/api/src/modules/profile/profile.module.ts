import { Module } from '@nestjs/common';

import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { WalletModule } from '../wallet/wallet.module';
import { AuthContextModule } from '../auth-context/auth-context.module';

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [AuthContextModule, WalletModule],
})
export class ProfileModule {}
