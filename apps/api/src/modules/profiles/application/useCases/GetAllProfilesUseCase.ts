import { Injectable, Inject } from '@nestjs/common';
import { ProfileRepository } from '../../domain/interfaces/ProfileRepository';
import { ProfileMapper } from '../mappers/ProfileMapper';
import { ProfileDto } from '../../presentation/dto/ProfileDto';

@Injectable()
export class GetAllProfilesUseCase {
  constructor(
    @Inject(ProfileRepository)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async execute(userId: number): Promise<ProfileDto[]> {
    const profiles = await this.profileRepository.findAllByUserId(userId);
    const result = profiles.map((profile) => ProfileMapper.toDTO(profile));
    return result;
  }
}
