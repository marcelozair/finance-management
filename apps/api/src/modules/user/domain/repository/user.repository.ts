import { Inject, Injectable } from '@nestjs/common';

import { CreateUserDTO } from '../dto/createUser.dto';
import { UserEntity } from '../../entities/user.entity';
import { EncryptHandler } from 'src/core/utils/CryptHandler';
import { IUserRepository } from '../../repository/userRepository';

import {
  UserRepositoryEntity,
  UserRepositoryName,
} from '../../entities/user.provider';

@Injectable()
export class UserRepository implements IUserRepository {
  @Inject(EncryptHandler)
  private readonly encryptHandler: EncryptHandler;

  @Inject(UserRepositoryName)
  private readonly userRepository: UserRepositoryEntity;

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(user: CreateUserDTO): Promise<UserEntity> {
    const password = await this.encryptHandler.encrypt(user.password);
    const userPayload = this.userRepository.create({ ...user, password });
    return this.userRepository.save(userPayload);
  }

  findById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { id } });
  }
}
