import {
  Body,
  Post,
  Inject,
  HttpCode,
  HttpStatus,
  Controller,
} from '@nestjs/common';

import { SignInDTO } from './dto/signin.dto';
import { SignUpDTO } from './dto/signup.dto';
import { ResHandler } from 'src/core/utils/response-handler';
import { SignInUseCase } from '../domain/userCases/signIn';
import { SignUpUseCase } from '../domain/userCases/signUp';

@Controller('auth')
export class AuthController {
  @Inject(SignInUseCase)
  private readonly signInUseCase: SignInUseCase;

  @Inject(SignUpUseCase)
  private readonly signUpUseCase: SignUpUseCase;

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
}
