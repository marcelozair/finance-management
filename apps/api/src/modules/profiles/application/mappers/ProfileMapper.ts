import { Profile } from '../../domain/entities/Profile';
import { Currency } from 'src/modules/wallets/domain/vo/Currency';
import { ProfileEntity } from 'src/shared/infrastructure/database/entities/profile.entity';

export class ProfileMapper {
  static entityToDomain(entity: ProfileEntity) {
    return new Profile(
      entity.id,
      entity.name,
      entity.color,
      new Currency(entity.currency),
      entity.userId,
    );
  }
}
