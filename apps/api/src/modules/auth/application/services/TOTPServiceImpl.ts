import * as qrcode from 'qrcode';
import * as speakeasy from 'speakeasy';

import {
  TOTPSecretDto,
  VerifySecretDto,
  TOTPSecretConfigDto,
  TOTPService,
} from '../../domain/interfaces/TOTPService';

/**
 * TOTPServiceImpl
 * This class handle each implementation method for TOTPService class located in domain layer (auth)
 * Handles external dependencies to generate Secret using TOTP design pattern
 */
export class TOTPServiceImpl implements TOTPService {
  /**
   * verifySecret method
   * @param secretOptions {VerifySecretDto} Secret configurations
   * @returns {boolean} Returns a boolean value indicating if the secret is valid
   */
  verifySecret(secretOptions: VerifySecretDto): boolean {
    return speakeasy.totp.verify(secretOptions);
  }

  /**
   * generateSecret method, generates secret value using speakeasy algorithms
   * @param options {TOTPSecretConfigDto} Values and configurations to generatee secret
   * @returns {TOTPSecretDto} Contians the secret value in base32 and other fields
   */
  generateSecret(options: TOTPSecretConfigDto): TOTPSecretDto {
    const secret = speakeasy.generateSecret(options);

    return {
      base32: secret.base32,
      otpauth_url: secret.otpauth_url,
    };
  }

  convertSecretIntoQR(secret: string): Promise<string> {
    return qrcode.toDataURL(secret);
  }
}
