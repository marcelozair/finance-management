import { I18nService } from 'nestjs-i18n';

import {
  Inject,
  BadRequestException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { ISessionUser } from '../interface/iSessionUser';
import { UserMapper } from 'src/modules/user/mapper/user.mapper';
import { AuthVerifyService } from '../services/AuthVerifyService';
import { VerifyCodeDTO } from '../../presentation/dto/verifyCode.dto';
import { UserRepository } from 'src/modules/user/domain/repository/user.repository';

export class VerifyCodeUseCase {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  @Inject(AuthVerifyService)
  private readonly authVerifyService: AuthVerifyService;

  @Inject(I18nService)
  private readonly i18n: I18nService;

  private readonly logger = new Logger(VerifyCodeUseCase.name);

  /**
   * Verify user code using TOTP Argun2 algorithm
   * @param {VerifyCodeDTO} body verify credentials
   * @returns {ISessionUser} user payload and session details
   */
  async execute(body: VerifyCodeDTO): Promise<ISessionUser> {
    const { userId, token } = body;
    this.logger.log(`Verifying user verification code for userId: ${userId}`);

    const user = await this.userRepository.findById(body.userId);

    if (!user) {
      this.logger.error(`User ${userId} does not exist`);
      throw new BadRequestException(this.i18n.t('auth.USER_NOT_EXIST'));
    }

    const isValid = this.authVerifyService.TOTPverifyToken(user.secret, token);

    if (!isValid) {
      this.logger.warn(`User token is invalid`);
      throw new UnauthorizedException(this.i18n.t('auth.INVALID_CODE'));
    }

    this.logger.log('User token is valid, creating user authorization Bearer');

    const authorizationToken = this.authVerifyService.generate(user);

    const userMapped = UserMapper.map(user);

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
