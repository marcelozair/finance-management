import { Logger, Module } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  JwtModule as JwtConfigModule,
  JwtService as JwtServiceImpl,
} from '@nestjs/jwt';

import { JwtService } from './domain/interfaces/JwtService';
import { TOTPService } from './domain/interfaces/TOTPService';
import { EncryptHandler } from 'src/core/utils/EncryptHandler';
import { AuthController } from './presentation/auth.controller';
import { SignUpUseCase } from './application/useCases/signUp.useCase';
import { TOTPServiceImpl } from './application/services/TOTPServiceImpl';
import { VerifyCodeUseCase } from './application/useCases/verifyCode';
import { SignInUseCase } from './application/useCases/signIn.useCase';
import { AuthVerifyService } from './domain/services/AuthVerifyService';
import { UserRepository } from '../users/domain/interfaces/user.repository';
import { UserEntity } from 'src/shared/infrastructure/database/entities/user.entity';
import { UserRepositoryImpl } from 'src/shared/infrastructure/database/repositories/user.repository';

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtConfigModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        signOptions: { expiresIn: '60s' },
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
  ],
  providers: [
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
        encrypt: EncryptHandler,
        authVerify: AuthVerifyService,
      ) => {
        return new SignUpUseCase(logger, i18n, userRepo, encrypt, authVerify);
      },
      inject: [
        Logger,
        I18nService,
        UserRepository,
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
