import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ProfileRepository } from '../../domain/interfaces/ProfileRepository';
import { UpdateProfileDTO } from '../../presentation/dto/updateProfile.dto';
import { ProfileMapper } from '../mappers/ProfileMapper';

@Injectable()
export class UpdateProfileUseCase {
  constructor(
    @Inject(ProfileRepository)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async execute(userId: number, profileId: number, data: UpdateProfileDTO) {
    const profile = await this.profileRepository.findById(profileId);

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    if (profile._userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to modify this profile',
      );
    }

    const updatedProfile = await this.profileRepository.update(profileId, {
      name: data.name,
      color: data.color,
      currency: data.currency,
    });

    return ProfileMapper.toDTO(updatedProfile);
  }
}
