import { Inject, UnauthorizedException } from '@nestjs/common';

import { I18nService } from 'nestjs-i18n';

import { SignInDTO } from '../../presentation/dto/signin.dto';
import { EncryptHandler } from 'src/core/utils/EncryptHandler';
import { UserSessionDTO } from '../../presentation/dto/session.dto';
import { AuthVerifyService } from '../../domain/services/AuthVerifyService';
import { UserMapper } from 'src/modules/users/application/mappers/user.mapper';
import { UserRepository } from 'src/modules/users/domain/interfaces/user.repository';

export class SignInUseCase {
  @Inject(EncryptHandler)
  private readonly encryptHandler: EncryptHandler;

  @Inject(I18nService)
  private readonly i18n: I18nService;

  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  @Inject(AuthVerifyService)
  private readonly authVerifyService: AuthVerifyService;

  /**
   * Sign up user using its credentials
   * @param {SignInDTO} body user credentials
   * @returns {Promise<UserSessionDTO>} user payload and authorization
   */
  async execute(body: SignInDTO): Promise<UserSessionDTO> {
    const { password, email } = body;

    const user = await this.userRepository.verifyCredentials(email, password);

    if (!user) {
      throw new UnauthorizedException(this.i18n.t('auth.INVALID_CREDENTIALS'));
    }

    const authorizationToken = this.authVerifyService.generate(user);

    return {
      user: UserMapper.toDTO(user),
      session: {
        authorizationToken,
        authorizationType: 'Bearer',
        sessionId: 'session-id-uuid-v4',
      },
    };
  }
}
