import { Profile } from '../../domain/entities/Profile';
import { Currency } from 'src/modules/wallets/domain/vo/Currency';
import { ProfileEntity } from 'src/infrastructure/database/entities/ProfileEntity';
import { ProfileDto } from '../../presentation/dto/ProfileDto';

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

  static toDTO(domain: Profile): ProfileDto {
    return {
      id: domain._id,
      name: domain._name,
      color: domain._color,
      currency: domain._currency,
    };
  }
}
