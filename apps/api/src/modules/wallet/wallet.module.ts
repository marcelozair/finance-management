import { Module } from '@nestjs/common';

import { WalletService } from './wallet.service';
import { WalletRepository } from './wallet.repository';
import { WalletController } from './wallet.controller';
import { WalletRepositoryProvider } from './entities/wallet.provider';
import { AuthContextModule } from '../auth-context/auth-context.module';

@Module({
  exports: [WalletService, WalletRepository],
  imports: [AuthContextModule],
  controllers: [WalletController],
  providers: [WalletService, WalletRepository, WalletRepositoryProvider],
})
export class WalletModule {}
