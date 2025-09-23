import { UserEntity } from '../entities/user.entity';
import { CreateUserDTO } from '../domain/dto/createUser.dto';

export interface IUserRepository {
  create(user: CreateUserDTO): Promise<UserEntity>;
  findById(id: number): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
}
