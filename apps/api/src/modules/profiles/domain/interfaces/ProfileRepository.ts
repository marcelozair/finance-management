import { Profile } from '../entities/Profile';

export interface UpdateProfileData {
  name?: string;
  color?: string;
  currency?: string;
}

export abstract class ProfileRepository {
  abstract save(profile: Profile): Promise<Profile>;
  abstract findById(id: number): Promise<Profile | null>;
  abstract findAllByUserId(userId: number): Promise<Profile[]>;
  abstract update(id: number, data: UpdateProfileData): Promise<Profile>;
}
