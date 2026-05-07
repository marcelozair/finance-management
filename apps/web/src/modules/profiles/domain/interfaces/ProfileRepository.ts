import type { ApiRes } from "../../../../core/interfaces/IApiResponse";
import type { Profile } from "../entities/Profile";

export interface ProfileRepository {
  getProfiles(): Promise<ApiRes<Profile[]>>;
}
