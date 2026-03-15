import { Profile } from '../entities/Profile';

export abstract class ProfileRepository {
  abstract save(profile: Profile): Promise<Profile>;
  // abstract findById(id: number): Promise<Profile | null>;
}
