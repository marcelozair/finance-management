import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ProfileDTO } from './dto/profile.dto';
import { UserDTO } from '../user/domain/dto/user.dto';
import { ProfileMapper } from './mapper/profile.mapper';
import { ProfileRepository } from './profile.repository';
import { UpdateProfileDTO } from './dto/update-profile.dto';
import { CreateProfileDTO } from './dto/create-profile.dto';

@Injectable()
export class ProfileService {
  @Inject(ProfileRepository)
  private readonly profileRepository: ProfileRepository;

  async create(profile: CreateProfileDTO, user: UserDTO): Promise<ProfileDTO> {
    const profileExists = await this.profileRepository.findByNameAndUser(
      profile.name,
      user,
    );

    if (profileExists) {
      throw new BadRequestException('Profile already exists');
    }

    const profileCreated = await this.profileRepository.create(profile, user);
    return ProfileMapper.map(profileCreated);
  }

  async update(profile: UpdateProfileDTO): Promise<ProfileDTO> {
    const profileExists = await this.profileRepository.findById(profile.id);

    if (!profileExists) {
      throw new NotFoundException('Profile not found');
    }

    const payload = Object.assign(profileExists, profile);
    await this.profileRepository.update(profileExists.id, payload);

    return ProfileMapper.map(payload);
  }
}
