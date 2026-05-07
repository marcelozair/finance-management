import { Module } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WalletController } from './presentation/WalletController';
import { WalletRepository } from './domain/interfaces/WalletRepository';
import { GetWalletUseCase } from './application/useCases/GetWalletsUseCase';
import { CreateWalletUseCase } from './application/useCases/CreateWalletUseCase';
import { WalletEntity } from 'src/infrastructure/database/entities/WalletEntity';
import { ProfileEntity } from 'src/infrastructure/database/entities/ProfileEntity';
import { WalletRepositoryImpl } from 'src/infrastructure/database/repositories/WalletRepositoryImpl';

import { TransactionModule } from '../transactions/transaction.module';
import { TransactionRepository } from '../transactions/domain/interfaces/TransactionRepository';

@Module({
  controllers: [WalletController],
  imports: [
    TypeOrmModule.forFeature([ProfileEntity, WalletEntity]),
    TransactionModule, // To get TransactionRepository
  ],
  providers: [
    {
      provide: WalletRepository,
      useClass: WalletRepositoryImpl,
    },
    {
      provide: GetWalletUseCase,
      useFactory: (
        i18nService: I18nService,
        walletRepo: WalletRepository,
        transactionRepo: TransactionRepository,
      ) => {
        return new GetWalletUseCase(i18nService, walletRepo, transactionRepo);
      },
      inject: [I18nService, WalletRepository, TransactionRepository],
    },
    {
      provide: CreateWalletUseCase,
      useFactory: (
        walletRepo: WalletRepository,
        transactionRepo: TransactionRepository,
      ) => {
        return new CreateWalletUseCase(walletRepo, transactionRepo);
      },
      inject: [WalletRepository, TransactionRepository],
    },
  ],
})
export class WalletModule {}
