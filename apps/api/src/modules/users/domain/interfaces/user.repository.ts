import { CreateUserDTO } from '../dto/createUser.dto';
import { User } from '../user';

export abstract class UserRepository {
  abstract create(user: CreateUserDTO): Promise<User>;
  abstract findById(id: number): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;

  abstract verifyCredentials(
    email: string,
    password: string,
  ): Promise<User | null>;
}
