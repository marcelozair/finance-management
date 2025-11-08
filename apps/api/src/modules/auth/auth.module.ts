import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule as JwtConfigModule } from '@nestjs/jwt';

import { SignInUseCase } from './domain/userCases/signIn';
import { SignUpUseCase } from './domain/userCases/signUp';
import { AuthController } from './presentation/auth.controller';
import { AuthVerifyService } from './domain/services/AuthVerifyService';
import { AuthContextModule } from '../auth-context/auth-context.module';
import { ResendService } from 'src/core/services/ResendService';
import { VerifyCodeUseCase } from './domain/userCases/verifyCode';

@Module({
  controllers: [AuthController],
  imports: [
    JwtConfigModule.register({
      global: true,
      secret: '1dEIHe12tCtO',
      signOptions: { expiresIn: '60s' },
    }),
    AuthContextModule,
  ],
  providers: [
    ConfigService,
    SignInUseCase,
    SignUpUseCase,
    VerifyCodeUseCase,
    ResendService,
    AuthVerifyService,
  ],
})
export class AuthModule {}
