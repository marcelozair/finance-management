import { Email, FullName } from '../../domain/vo';

import { User } from '../../domain/entities/User';
import { UserDTO } from '../../presentation/dto/user.dto';
import { UserEntity } from 'src/infrastructure/database/entities/UserEntity';

export class UserMapper {
  static toDTO(user: User): UserDTO {
    return {
      id: user._id,
      name: user._name,
      email: user._email,
    };
  }

  static entityToDomain(userEntity: UserEntity): User {
    const user = new User(
      userEntity.id,
      new FullName(userEntity.name),
      new Email(userEntity.email),
      userEntity.phone,
      userEntity.secret,
      userEntity.password,
    );

    return user;
  }
}
