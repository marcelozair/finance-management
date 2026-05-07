import { I18nService } from 'nestjs-i18n';
import { BadRequestException, Logger } from '@nestjs/common';

import { SignUpDTO } from '../../presentation/dto/signup.dto';
import { EncryptHandler } from 'src/shared/utils/EncryptHandler';
import { AuthVerifyService } from '../../domain/services/AuthVerifyService';
import { SignUpResponseDTO } from '../../presentation/dto/signupResponse.dto';
import { UserMapper } from 'src/modules/users/application/mappers/user.mapper';
import { UserRepository } from 'src/modules/users/domain/interfaces/UserRepository';
import { Email, FullName } from 'src/modules/users/domain/vo';
import { User } from 'src/modules/users/domain/entities/User';
import { ProfileRepository } from 'src/modules/profiles/domain/interfaces/ProfileRepository';
import { Profile } from 'src/modules/profiles/domain/entities/Profile';
import { Currency } from 'src/modules/wallets/domain/vo/Currency';
import { WalletRepository } from 'src/modules/wallets/domain/interfaces/WalletRepository';
import { Wallet } from 'src/modules/wallets/domain/entities/Wallet';
import { WalletName } from 'src/modules/wallets/domain/vo/WalletName';
import {
  WalletType,
  WalletTypes,
} from 'src/modules/wallets/domain/vo/WalletType';
import { WalletColor } from 'src/modules/wallets/domain/vo/WalletColor';

export class SignUpUseCase {
  constructor(
    private readonly logger: Logger,
    private readonly i18n: I18nService,
    private readonly userRepo: UserRepository,
    private readonly walletRepo: WalletRepository,
    private readonly profileRepo: ProfileRepository,
    private readonly encryptHandler: EncryptHandler,
    private readonly authVerifyService: AuthVerifyService,
  ) {}

  /**
   * Sign up user using its credentials
   * @param {SignUpDto} body user credentials
   * @returns {SignUpResponseDTO} user payload and authorization
   */
  async execute(body: SignUpDTO): Promise<SignUpResponseDTO> {
    // #TODO | CRITICAL | Implement transactions

    this.logger.log(`Register user credentials for: ${body.email}`);

    const userEmail = new Email(body.email);
    const user = await this.userRepo.findByEmail(userEmail);

    if (user) {
      this.logger.error(`User with email ${body.email} already exists`);
      throw new BadRequestException(this.i18n.t('auth.USER_EXIST'));
    }

    const userSecretKey = this.authVerifyService.createSecretTOTP();
    this.logger.debug(`User secret key created: ${userSecretKey.value}`);

    const hashPassword = await this.encryptHandler.encrypt(body.password);
    this.logger.log('User password encrypted successfully');

    const userCreated = await this.userRepo.create(
      User.forCreate(
        new FullName(body.name),
        userEmail,
        body.phone,
        userSecretKey.value,
        hashPassword,
      ),
    );

    const currency = new Currency(body.currency);
    const newProfile = Profile.forCreate(
      body.name,
      'default-profile-color',
      currency,
      userCreated._id,
    );

    const profile = await this.profileRepo.save(newProfile);

    this.logger.log(
      `User created in storage. id=${userCreated._id} profileId=${profile._id} email=${userCreated._email} `,
    );

    const defaultWallet = Wallet.forCreate(
      new WalletName('Cash'),
      new WalletType(WalletTypes.CASH),
      currency,
      new WalletColor('#37943F'),
      null,
    );

    await this.walletRepo.save(profile._id, defaultWallet);

    return {
      user: UserMapper.toDTO(userCreated),
      secret: userSecretKey.path,
    };
  }
}
