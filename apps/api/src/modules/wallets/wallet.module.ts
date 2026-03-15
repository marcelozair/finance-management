import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WalletRepository } from './domain/interfaces/WalletRepository';
import { GetWalletUseCase } from './application/useCases/GetWalletsUseCase';
import { CreateWalletUseCase } from './application/useCases/CreateWalletUseCase';
import { WalletEntity } from 'src/shared/infrastructure/database/entities/wallet.entity';
import { ProfileEntity } from 'src/shared/infrastructure/database/entities/profile.entity';
import { WalletRepositoryImpl } from 'src/shared/infrastructure/database/repositories/WalletRepositoryImpl';

@Module({
  controllers: [],
  imports: [TypeOrmModule.forFeature([ProfileEntity, WalletEntity])],
  providers: [
    {
      provide: WalletRepository,
      useClass: WalletRepositoryImpl,
    },
    {
      provide: GetWalletUseCase,
      useFactory: (walletRepo: WalletRepository) => {
        return new GetWalletUseCase(walletRepo);
      },
      inject: [WalletRepository],
    },
    {
      provide: CreateWalletUseCase,
      useFactory: (walletRepo: WalletRepository) => {
        return new CreateWalletUseCase(walletRepo);
      },
      inject: [WalletRepository],
    },
  ],
})
export class WalletModule {}
