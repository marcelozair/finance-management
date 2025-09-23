import { Inject } from '@nestjs/common';

import {
  ProfileRepositoryEntity,
  ProfileRepositoryName,
} from './entities/profile.provider';
import { UserDTO } from '../user/domain/dto/user.dto';
import { ProfileEntity } from './entities/profile.entity';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { UpdateProfileDTO } from './dto/update-profile.dto';

export class ProfileRepository {
  @Inject(ProfileRepositoryName)
  private readonly profileRepository: ProfileRepositoryEntity;

  create(profile: CreateProfileDTO, user: UserDTO): Promise<ProfileEntity> {
    const profilePayload = this.profileRepository.create({
      ...profile,
      user,
    });

    return this.profileRepository.save(profilePayload);
  }

  findById(profileId: number): Promise<ProfileEntity | null> {
    return this.profileRepository.findOne({
      where: { id: profileId },
    });
  }

  async update(profileId: number, profile: UpdateProfileDTO): Promise<void> {
    await this.profileRepository.update({ id: profileId }, profile);
  }

  findByNameAndUser(
    name: string,
    user: UserDTO,
  ): Promise<ProfileEntity | null> {
    return this.profileRepository.findOne({
      where: { name, user },
    });
  }
}
