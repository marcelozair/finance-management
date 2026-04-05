import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WalletController } from './presentation/WalletController';
import { WalletRepository } from './domain/interfaces/WalletRepository';
import { TransactionRepository } from './domain/interfaces/TransactionRepository';
import { GetWalletUseCase } from './application/useCases/GetWalletsUseCase';
import { CreateWalletUseCase } from './application/useCases/CreateWalletUseCase';
import { WalletEntity } from 'src/shared/infrastructure/database/entities/wallet.entity';
import { ProfileEntity } from 'src/shared/infrastructure/database/entities/profile.entity';
import { TransactionEntity } from 'src/shared/infrastructure/database/entities/transaction.entity';
import { WalletRepositoryImpl } from 'src/shared/infrastructure/database/repositories/WalletRepositoryImpl';
import { TransactionRepositoryImpl } from 'src/shared/infrastructure/database/repositories/TransactionRepositoryImpl';

@Module({
  controllers: [WalletController],
  imports: [
    TypeOrmModule.forFeature([ProfileEntity, WalletEntity, TransactionEntity]),
  ],
  providers: [
    {
      provide: WalletRepository,
      useClass: WalletRepositoryImpl,
    },
    {
      provide: TransactionRepository,
      useClass: TransactionRepositoryImpl,
    },
    {
      provide: GetWalletUseCase,
      useFactory: (
        walletRepo: WalletRepository,
        transactionRepo: TransactionRepository,
      ) => {
        return new GetWalletUseCase(walletRepo, transactionRepo);
      },
      inject: [WalletRepository, TransactionRepository],
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
