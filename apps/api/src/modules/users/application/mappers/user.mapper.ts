import { UserEntity } from 'src/shared/infrastructure/database/entities/user.entity';
import { User } from '../../domain/user';
import { UserDTO } from '../../presentation/dto/user.dto';

export class UserMapper {
  static toDTO(user: User): UserDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  static entityToDomain(userEntity: UserEntity): User {
    const user = new User(
      userEntity.id,
      userEntity.name,
      userEntity.email,
      userEntity.phone,
      userEntity.secret,
    );

    return user;
  }
}
