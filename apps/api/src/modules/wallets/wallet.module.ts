import { Module } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WalletController } from './presentation/WalletController';
import { WalletRepository } from './domain/interfaces/WalletRepository';
import { GetWalletUseCase } from './application/useCases/GetWalletsUseCase';
import { CreateWalletUseCase } from './application/useCases/CreateWalletUseCase';
import { TransactionRepository } from './domain/interfaces/TransactionRepository';
import { GetTransactionsUseCase } from './application/useCases/GetTransactionsUseCase';
import { WalletEntity } from 'src/shared/infrastructure/database/entities/wallet.entity';
import { ProfileEntity } from 'src/shared/infrastructure/database/entities/profile.entity';
import { CreateTransactionUseCase } from './application/useCases/CreateTransactionUseCase';
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
    {
      provide: CreateTransactionUseCase,
      useFactory: (transactionRepo: TransactionRepository) => {
        return new CreateTransactionUseCase(transactionRepo);
      },
      inject: [TransactionRepository],
    },
    {
      provide: GetTransactionsUseCase,
      useFactory: (transactionRepo: TransactionRepository) => {
        return new GetTransactionsUseCase(transactionRepo);
      },
      inject: [TransactionRepository],
    },
  ],
})
export class WalletModule {}
