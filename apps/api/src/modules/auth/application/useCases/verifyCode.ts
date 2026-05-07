import { I18nService } from 'nestjs-i18n';

import {
  Logger,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import { UserSessionDTO } from '../../presentation/dto/session.dto';
import { VerifyCodeDTO } from '../../presentation/dto/verifyCode.dto';
import { AuthVerifyService } from '../../domain/services/AuthVerifyService';
import { UserMapper } from 'src/modules/users/application/mappers/user.mapper';
import { UserRepository } from 'src/modules/users/domain/interfaces/UserRepository';

export class VerifyCodeUseCase {
  constructor(
    private readonly logger: Logger,
    private readonly i18n: I18nService,
    private readonly userRepository: UserRepository,
    private readonly authVerifyService: AuthVerifyService,
  ) {}

  /**
   * Verify user code using TOTP Argun2 algorithm
   * @param {VerifyCodeDTO} body verify credentials
   * @returns {UserSessionDTO} user payload and session details
   */
  async execute(body: VerifyCodeDTO): Promise<UserSessionDTO> {
    const { userId, token } = body;
    this.logger.log(`Verifying user verification code for userId: ${userId}`);

    const user = await this.userRepository.findById(body.userId);

    if (!user) {
      this.logger.error(`User ${userId} does not exist`);
      throw new BadRequestException(this.i18n.t('auth.USER_NOT_EXIST'));
    }

    const isValid = this.authVerifyService.verifyTokenTOTP(user._secret, token);

    if (!isValid) {
      this.logger.warn(`User token is invalid`);
      throw new UnauthorizedException(this.i18n.t('auth.INVALID_CODE'));
    }

    this.logger.log('User token is valid, creating user authorization Bearer');

    const authorizationToken =
      this.authVerifyService.createAuthorizationToken(user);

    const userMapped = UserMapper.toDTO(user);

    this.logger.log('User verification process complete successful');

    return {
      user: userMapped,
      session: {
        authorizationToken,
        authorizationType: 'Bearer',
        sessionId: 'session-id-uuid-v4',
      },
    };
  }
}
