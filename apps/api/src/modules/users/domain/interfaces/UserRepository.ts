import { Email } from '../vo';
import { User } from '../entities/User';

export abstract class UserRepository {
  abstract create(user: User): Promise<User>;
  abstract findById(id: number): Promise<User | null>;
  abstract findByEmail(email: Email): Promise<User | null>;

  abstract verifyCredentials(
    email: Email,
    password: string,
  ): Promise<User | null>;
}
