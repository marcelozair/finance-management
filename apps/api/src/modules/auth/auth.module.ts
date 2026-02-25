import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule as JwtConfigModule } from '@nestjs/jwt';

import { AuthController } from './presentation/auth.controller';
import { SignInUseCase } from './application/useCases/signIn.useCase';
import { EncryptHandler } from 'src/core/utils/EncryptHandler';
import { UserRepository } from '../users/domain/interfaces/user.repository';
import { UserRepositoryImpl } from 'src/shared/infrastructure/database/repositories/user.repository';
import { AuthVerifyService } from './domain/services/AuthVerifyService';
import { UserEntity } from 'src/shared/infrastructure/database/entities/user.entity';
import { SignUpUseCase } from './application/useCases/signUp.useCase';
import { VerifyCodeUseCase } from './application/useCases/verifyCode';

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtConfigModule.register({
      global: true,
      secret: '1dEIHe12tCtO',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    SignInUseCase,
    SignUpUseCase,
    EncryptHandler,
    AuthVerifyService,
    VerifyCodeUseCase,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class AuthModule {}
