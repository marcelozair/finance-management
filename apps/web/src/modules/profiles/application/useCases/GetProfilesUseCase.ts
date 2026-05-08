import type { Profile } from "../../domain/entities/Profile";
import type { ProfileRepository } from "../../domain/interfaces/ProfileRepository";

export class GetProfilesUseCase {
  constructor(private readonly repository: ProfileRepository) {}

  execute(): Promise<Profile[]> {
    return this.repository.getProfiles();
  }
}
