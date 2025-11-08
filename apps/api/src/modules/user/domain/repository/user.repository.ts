import { Inject, Injectable } from '@nestjs/common';

import { CreateUserDTO } from '../dto/createUser.dto';
import { UserEntity } from '../../entities/user.entity';
import { IUserRepository } from '../../repository/userRepository';

import {
  UserRepositoryEntity,
  UserRepositoryName,
} from '../../entities/user.provider';

@Injectable()
export class UserRepository implements IUserRepository {
  @Inject(UserRepositoryName)
  private readonly userRepository: UserRepositoryEntity;

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  create(user: CreateUserDTO): Promise<UserEntity> {
    const userPayload = this.userRepository.create(user);
    return this.userRepository.save(userPayload);
  }

  findById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { id } });
  }
}
