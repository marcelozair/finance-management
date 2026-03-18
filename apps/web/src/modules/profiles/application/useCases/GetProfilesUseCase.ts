import type { ApiRes } from "../../../../core/interfaces/IApiResponse";
import type { ProfileRepository } from "../../domain/interfaces/ProfileRepository";
import type { Profile } from "../../domain/entities/Profile";

export class GetProfilesUseCase {
  constructor(private readonly repository: ProfileRepository) {}

  execute(): Promise<ApiRes<Profile[]>> {
    return this.repository.getProfiles();
  }
}
