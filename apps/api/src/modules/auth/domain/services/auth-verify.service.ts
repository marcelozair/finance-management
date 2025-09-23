import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';

import { UserDTO } from '../../../user/domain/dto/user.dto';
import { UserEntity } from '../../../user/entities/user.entity';

@Injectable()
export class AuthVerifyService {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Inject(ConfigService)
  private readonly configService: ConfigService;

  generate(user: UserEntity): string {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return this.jwtService.sign(userWithoutPassword, { expiresIn: '1d' });
  }

  decryptAuthorization(token: string): Promise<UserDTO> {
    const JWT_SECRET = this.configService.get<string>('JWT_SECRET');
    return this.jwtService.verify(token, { secret: JWT_SECRET });
  }
}
