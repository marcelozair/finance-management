import { I18nService } from 'nestjs-i18n';

import { Inject, BadRequestException, Logger } from '@nestjs/common';

import { SignUpDTO } from '../../presentation/dto/signup.dto';
import { SignUpResponse } from '../interface/sign-up.interface';
import { EncryptHandler } from 'src/core/utils/EncryptHandler';
import { UserMapper } from 'src/modules/user/mapper/user.mapper';
import { AuthVerifyService } from '../services/AuthVerifyService';
import { UserRepository } from 'src/modules/user/domain/repository/user.repository';

export class SignUpUseCase {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  @Inject(AuthVerifyService)
  private readonly authVerifyService: AuthVerifyService;

  @Inject(I18nService)
  private readonly i18n: I18nService;

  @Inject(EncryptHandler)
  private readonly encryptHandler: EncryptHandler;

  private readonly logger = new Logger(SignUpUseCase.name);

  /**
   * Sign up user using its credentials
   * @param {SignUpDto} body user credentials
   * @returns {SignUpResponse} user payload and authorization
   */
  async execute(body: SignUpDTO): Promise<SignUpResponse> {
    this.logger.log(`Register user credentials for: ${body.email}`);

    const user = await this.userRepository.findByEmail(body.email);

    if (user) {
      this.logger.error(`User with email ${body.email} already exists`);
      throw new BadRequestException(this.i18n.t('auth.USER_EXIST'));
    }

    const userSecretKey = this.authVerifyService.TOTPcreateSecret();
    this.logger.debug(`User secret key created: ${userSecretKey.value}`);

    const password = await this.encryptHandler.encrypt(body.password);
    this.logger.log('User password encrypted successfully');

    const userCreated = await this.userRepository.create({
      ...body,
      password,
      secret: userSecretKey.value,
    });

    this.logger.log(
      `User created in storage. id=${userCreated.id} email=${body.email}`,
    );

    const userMapped = UserMapper.map(userCreated);

    return {
      user: userMapped,
      secret: userSecretKey.path,
    };
  }
}
