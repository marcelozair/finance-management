import type { Profile } from "../domain/entities/Profile";
import { GetProfilesUseCase } from "./useCases/GetProfilesUseCase";
import { ProfileRepositoryImpl } from "../infrastructure/repositories/ProfileRepository";

export class ProfileDomain {
  private readonly getProfilesUseCase: GetProfilesUseCase;

  constructor() {
    // Instantiate repository and inject it to handle IoC
    const profileRepository = new ProfileRepositoryImpl();

    this.getProfilesUseCase = new GetProfilesUseCase(profileRepository);
  }

  public async getProfiles(): Promise<Profile[]> {
    return this.getProfilesUseCase.execute();
  }
}
