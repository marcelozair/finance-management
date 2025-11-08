import {
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

import { EncryptHandler } from 'src/core/utils/EncryptHandler';
import { UserMapper } from '../../../user/mapper/user.mapper';
import { SignInDTO } from '../../presentation/dto/signin.dto';
import { AuthVerifyService } from '../services/AuthVerifyService';
import { UserRepository } from 'src/modules/user/domain/repository/user.repository';
import { IUserRepository } from 'src/modules/user/repository/userRepository';
import { ISessionUser } from '../interface/iSessionUser';

export class SignInUseCase {
  @Inject(EncryptHandler)
  private readonly encryptHandler: EncryptHandler;

  @Inject(I18nService)
  private readonly i18n: I18nService;

  @Inject(UserRepository)
  private readonly userRepository: IUserRepository;

  @Inject(AuthVerifyService)
  private readonly authVerifyService: AuthVerifyService;

  /**
   * Sign up user using its credentials
   * @param {SignInDTO} body user credentials
   * @returns {Promise<ISessionUser>} user payload and authorization
   */
  async execute(body: SignInDTO): Promise<ISessionUser> {
    const { password, email } = body;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(this.i18n.t('auth.USER_NOT_EXIST'));
    }

    const isPasswordMatch = await this.encryptHandler.verify(
      password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException(this.i18n.t('auth.INVALID_PASSWORD'));
    }

    const authorizationToken = this.authVerifyService.generate(user);

    return {
      user: UserMapper.map(user),
      session: {
        authorizationToken,
        authorizationType: 'Bearer',
        sessionId: 'session-id-uuid-v4',
      },
    };
  }
}
