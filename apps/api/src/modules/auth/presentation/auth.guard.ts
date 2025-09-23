import {
  Inject,
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

import { UserDTO } from '../../user/domain/dto/user.dto';
import { UserMapper } from '../../user/mapper/user.mapper';
import { UserRepository } from '../../user/domain/repository/user.repository';
// import { ProfileMapper } from '../profile/mapper/profile.mapper';
// import { ProfileRepository } from '../profile/profile.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(UserRepository)
  private userRepository: UserRepository;

  // @Inject(ProfileRepository)
  // private profileRepository: ProfileRepository;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    // const profileId: string | null = request?.header['profileId'] || null;

    if (!token) throw new UnauthorizedException();

    try {
      const user = await this.jwtService.verifyAsync<UserDTO>(token, {
        secret: '1dEIHe12tCtO',
      });

      const userMapped = UserMapper.map(user);

      const userExist = await this.userRepository.findById(user.id);

      if (!userExist) throw new UnauthorizedException();

      request['user'] = userMapped;

      // if (profileId) {
      //   const profile = await this.profileRepository.findById(
      //     Number(profileId),
      //   );

      //   if (!profile) throw new UnauthorizedException("Profile doesn't exist");

      //   const profileMapped = ProfileMapper.map(profile);
      //   request['profile'] = profileMapped;
      // }
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const { authorization } = request.headers as { authorization: string };

    const [type, token] = authorization ? authorization.split(' ') : [];
    return type === 'Bearer' ? token : undefined;
  }
}
