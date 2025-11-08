import * as qrcode from 'qrcode';
import * as speakeasy from 'speakeasy';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';

import { UserDTO } from '../../../user/domain/dto/user.dto';
import { UserEntity } from '../../../user/entities/user.entity';

export interface TOTPSecret {
  value: string;
  path: string;
}

@Injectable()
export class AuthVerifyService {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Inject(ConfigService)
  private readonly configService: ConfigService;

  generate(user: UserEntity): string {
    return this.jwtService.sign({ userId: user.id }, { expiresIn: '1d' });
  }

  decryptAuthorization(token: string): Promise<UserDTO> {
    const JWT_SECRET = this.configService.get<string>('JWT_SECRET');
    return this.jwtService.verify(token, { secret: JWT_SECRET });
  }

  TOTPcreateSecret(): TOTPSecret {
    try {
      const secret = speakeasy.generateSecret({
        issuer: 'Personal Finance App',
        name: 'Finance',
        length: 25,
      });

      return {
        value: secret.base32,
        path: secret.otpauth_url || 'Unknow',
      };
    } catch {
      // #TODO Implement business rules for invalid secret generations
      return {
        value: 'Unknow',
        path: 'Unknow',
      };
    }
  }

  TOTPverifyToken(secret: string, token: string): boolean {
    return speakeasy.totp.verify({
      token,
      secret,
      encoding: 'base32',
    });
  }

  TOTPgetSecretQR(secret: string): Promise<string> {
    return qrcode.toDataURL(secret);
  }
}
