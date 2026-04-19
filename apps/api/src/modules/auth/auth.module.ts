import { I18nService } from 'nestjs-i18n';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtService as JwtServiceImpl } from '@nestjs/jwt';

import { JwtService } from './domain/interfaces/JwtService';
import { TOTPService } from './domain/interfaces/TOTPService';
import { EncryptHandler } from 'src/shared/utils/EncryptHandler';
import { AuthController } from './presentation/AuthController';
import { SignUpUseCase } from './application/useCases/signUp.useCase';
import { TOTPServiceImpl } from './application/services/TOTPServiceImpl';
import { VerifyCodeUseCase } from './application/useCases/verifyCode';
import { SignInUseCase } from './application/useCases/signIn.useCase';
import { AuthVerifyService } from './domain/services/AuthVerifyService';
import { UserRepository } from '../users/domain/interfaces/UserRepository';
import { UserEntity } from 'src/infrastructure/database/entities/UserEntity';
import { UserRepositoryImpl } from 'src/infrastructure/database/repositories/UserRepositoryImpl';
import { ProfileRepository } from '../profiles/domain/interfaces/ProfileRepository';
import { ProfileRepositoryImpl } from 'src/infrastructure/database/repositories/ProfileRepositoryImpl';
import { ProfileEntity } from 'src/infrastructure/database/entities/ProfileEntity';
import { WalletRepositoryImpl } from 'src/infrastructure/database/repositories/WalletRepositoryImpl';
import { WalletRepository } from '../wallets/domain/interfaces/WalletRepository';
import { WalletEntity } from 'src/infrastructure/database/entities/WalletEntity';

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UserEntity, ProfileEntity, WalletEntity]),
  ],
  providers: [
    Logger,
    EncryptHandler, // #TODO create class interface ..
    {
      provide: TOTPService,
      useClass: TOTPServiceImpl,
    },
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
    {
      provide: ProfileRepository,
      useClass: ProfileRepositoryImpl,
    },
    {
      provide: WalletRepository,
      useClass: WalletRepositoryImpl,
    },
    {
      provide: AuthVerifyService,
      useFactory: (jwtService: JwtService, totpService: TOTPService) =>
        new AuthVerifyService(jwtService, totpService),
      inject: [JwtServiceImpl, TOTPService],
    },
    {
      provide: SignInUseCase,
      useFactory: (
        i18n: I18nService,
        userRepo: UserRepository,
        authVerify: AuthVerifyService,
      ) => {
        return new SignInUseCase(i18n, userRepo, authVerify);
      },
      inject: [I18nService, UserRepository, AuthVerifyService],
    },
    {
      provide: SignUpUseCase,
      useFactory: (
        logger: Logger,
        i18n: I18nService,
        userRepo: UserRepository,
        profileRepo: ProfileRepository,
        walletRepo: WalletRepository,
        encrypt: EncryptHandler,
        authVerify: AuthVerifyService,
      ) => {
        return new SignUpUseCase(
          logger,
          i18n,
          userRepo,
          walletRepo,
          profileRepo,
          encrypt,
          authVerify,
        );
      },
      inject: [
        Logger,
        I18nService,
        UserRepository,
        ProfileRepository,
        WalletRepository,
        EncryptHandler,
        AuthVerifyService,
      ],
    },
    {
      provide: VerifyCodeUseCase,
      useFactory: (
        logger: Logger,
        i18n: I18nService,
        userRepo: UserRepository,
        authVerify: AuthVerifyService,
      ) => {
        return new VerifyCodeUseCase(logger, i18n, userRepo, authVerify);
      },
      inject: [Logger, I18nService, UserRepository, AuthVerifyService],
    },
  ],
})
export class AuthModule {}
