import { UserDTO } from '../domain/dto/user.dto';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static map(user: UserEntity | UserDTO): UserDTO {
    return new UserDTO({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }
}
