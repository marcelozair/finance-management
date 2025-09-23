import { I18nService } from 'nestjs-i18n';
import { BadRequestException, Inject } from '@nestjs/common';

import { SignUpDTO } from '../../presentation/dto/signup.dto';
import { SignUpResponse } from '../interface/sign-up.interface';
import { UserMapper } from 'src/modules/user/mapper/user.mapper';
import { UserRepository } from 'src/modules/user/domain/repository/user.repository';
import { AuthVerifyService } from '../services/auth-verify.service';

export class SignUpUseCase {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  @Inject(AuthVerifyService)
  private readonly authVerifyService: AuthVerifyService;

  @Inject(I18nService)
  private readonly i18n: I18nService;

  /**
   * Sign up user using its credentials
   * @param {SignUpDto} body user credentials
   * @returns {SignUpResponse} user payload and authorization
   */
  async execute(body: SignUpDTO): Promise<SignUpResponse> {
    const user = await this.userRepository.findByEmail(body.email);

    if (user) {
      throw new BadRequestException(this.i18n.t('auth.USER_EXIST'));
    }

    const userCreated = await this.userRepository.create(body);
    const authorizationToken = this.authVerifyService.generate(userCreated);

    const userMapped = UserMapper.map(userCreated);

    return {
      authorization: authorizationToken,
      user: userMapped,
    };
  }
}
