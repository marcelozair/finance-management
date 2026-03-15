import { TOTPSecret } from '../entities/TOTPSecret';
import { JwtService } from '../interfaces/JwtService';
import { TOTPService } from '../interfaces/TOTPService';
import { User } from 'src/modules/users/domain/entities/User';
import { TOTPInternalError } from '../exceptions/TOTPInternalError';
import { InvalidAuthorizationToken } from '../exceptions/InvalidAuthorizationToken';

export class AuthVerifyService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly totpService: TOTPService,
  ) {}

  async decryptAuthorizationToken(
    token: string,
    secret: string,
  ): Promise<number> {
    const raw = await this.jwtService.verify(token, { secret });

    if (!raw.userId || typeof raw.userId != 'number') {
      throw new InvalidAuthorizationToken();
    }

    return raw.userId as number;
  }

  createAuthorizationToken(user: User): string {
    return this.jwtService.sign({ userId: user._id }, { expiresIn: '1d' });
  }

  createSecretTOTP(): TOTPSecret {
    try {
      const secret = this.totpService.generateSecret({
        issuer: 'Personal Finance App',
        name: 'Finance',
        length: 25,
      });

      if (!secret.otpauth_url) throw new TOTPInternalError();

      return new TOTPSecret(secret.base32, secret.otpauth_url);
    } catch (error) {
      console.error(error);
      throw new TOTPInternalError();
    }
  }

  verifyTokenTOTP(secret: string, token: string): boolean {
    return this.totpService.verifySecret({
      token,
      secret,
      encoding: 'base32',
    });
  }
}
