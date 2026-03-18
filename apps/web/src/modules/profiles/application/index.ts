import type { ApiRes } from "../../../core/interfaces/IApiResponse";
import type { Profile } from "../domain/entities/Profile";
import { ProfileRepositoryImpl } from "../infrastructure/repositories/ProfileRepository";
import { GetProfilesUseCase } from "./useCases/GetProfilesUseCase";

export class ProfileDomain {
  private readonly getProfilesUseCase: GetProfilesUseCase;

  constructor() {
    // Instantiate repository and inject it to handle IoC
    const profileRepository = new ProfileRepositoryImpl();
    
    this.getProfilesUseCase = new GetProfilesUseCase(profileRepository);
  }

  public async getProfiles(): Promise<ApiRes<Profile[]>> {
    return this.getProfilesUseCase.execute();
  }
}
