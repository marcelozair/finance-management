import { ProfileEntity } from '../entities/profile.entity';

export class ProfileDTO extends ProfileEntity {
  constructor(partial: Partial<ProfileEntity>) {
    super();
    Object.assign(this, partial);
  }
}
