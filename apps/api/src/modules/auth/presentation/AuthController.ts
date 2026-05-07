import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';

import { SignInDTO } from './dto/signin.dto';
import { SignUpDTO } from './dto/signup.dto';
import { VerifyCodeDTO } from './dto/verifyCode.dto';
import { ResHandler } from 'src/shared/utils/response-handler';
import { SignUpUseCase } from '../application/useCases/signUp.useCase';
import { SignInUseCase } from '../application/useCases/signIn.useCase';
import { VerifyCodeUseCase } from '../application/useCases/verifyCode';

@Controller('auth')
export class AuthController {
  @Inject(SignInUseCase)
  private readonly signInUseCase: SignInUseCase;

  @Inject(SignUpUseCase)
  private readonly signUpUseCase: SignUpUseCase;

  @Inject(VerifyCodeUseCase)
  private readonly verifyCodeUseCase: VerifyCodeUseCase;

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() body: SignInDTO) {
    const response = await this.signInUseCase.execute(body);
    return ResHandler(response);
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() body: SignUpDTO) {
    const response = await this.signUpUseCase.execute(body);
    return ResHandler(response);
  }

  @Post('verify-code')
  @HttpCode(HttpStatus.OK)
  async verifyCode(@Body() body: VerifyCodeDTO) {
    const response = await this.verifyCodeUseCase.execute(body);
    return ResHandler(response);
  }
}
