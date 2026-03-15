import { I18nService } from 'nestjs-i18n';
import { BadRequestException, Logger } from '@nestjs/common';

import { SignUpDTO } from '../../presentation/dto/signup.dto';
import { EncryptHandler } from 'src/core/utils/EncryptHandler';
import { AuthVerifyService } from '../../domain/services/AuthVerifyService';
import { SignUpResponseDTO } from '../../presentation/dto/signupResponse.dto';
import { UserMapper } from 'src/modules/users/application/mappers/user.mapper';
import { UserRepository } from 'src/modules/users/domain/interfaces/user.repository';
import { Email, FullName } from 'src/modules/users/domain/vo';
import { User } from 'src/modules/users/domain/entities/User';

export class SignUpUseCase {
  constructor(
    private readonly logger: Logger,
    private readonly i18n: I18nService,
    private readonly userRepository: UserRepository,
    private readonly encryptHandler: EncryptHandler,
    private readonly authVerifyService: AuthVerifyService,
  ) {}

  /**
   * Sign up user using its credentials
   * @param {SignUpDto} body user credentials
   * @returns {SignUpResponseDTO} user payload and authorization
   */
  async execute(body: SignUpDTO): Promise<SignUpResponseDTO> {
    this.logger.log(`Register user credentials for: ${body.email}`);

    const userEmail = new Email(body.email);
    const user = await this.userRepository.findByEmail(userEmail);

    if (user) {
      this.logger.error(`User with email ${body.email} already exists`);
      throw new BadRequestException(this.i18n.t('auth.USER_EXIST'));
    }

    const userSecretKey = this.authVerifyService.createSecretTOTP();
    this.logger.debug(`User secret key created: ${userSecretKey.value}`);

    const hashPassword = await this.encryptHandler.encrypt(body.password);
    this.logger.log('User password encrypted successfully');

    const userCreated = await this.userRepository.create(
      User.forCreate(
        new FullName(body.name),
        userEmail,
        body.phone,
        userSecretKey.value,
        hashPassword,
      ),
    );

    this.logger.log(
      `User created in storage. id=${userCreated._id} email=${userCreated._email}`,
    );

    return {
      user: UserMapper.toDTO(userCreated),
      secret: userSecretKey.path,
    };
  }
}
