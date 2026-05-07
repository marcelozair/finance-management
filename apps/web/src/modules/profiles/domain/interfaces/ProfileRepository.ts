import type { Profile } from "../entities/Profile";

export interface ProfileRepository {
  getProfiles(): Promise<Profile[]>;
}
