import { ProfileDTO } from '../dto/profile.dto';
import { ProfileEntity } from '../entities/profile.entity';

export class ProfileMapper {
  static map(profile: ProfileEntity): ProfileDTO {
    return new ProfileDTO({
      id: profile.id,
      name: profile.name,
      color: profile.color,
      currency: profile.currency,
    });
  }
}
