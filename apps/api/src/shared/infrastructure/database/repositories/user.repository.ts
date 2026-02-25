import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '../entities/user.entity';
import { User } from 'src/modules/users/domain/user';
import { EncryptHandler } from 'src/core/utils/EncryptHandler';
import { CreateUserDTO } from 'src/modules/users/domain/dto/createUser.dto';
import { UserMapper } from 'src/modules/users/application/mappers/user.mapper';
import { UserRepository } from 'src/modules/users/domain/interfaces/user.repository';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  @InjectRepository(UserEntity)
  private readonly repository: Repository<UserEntity>;

  constructor(private readonly encryptHandler: EncryptHandler) {}

  async create(user: CreateUserDTO): Promise<User> {
    const userPayload = this.repository.create(user);
    const userEntity = await this.repository.save(userPayload);
    return UserMapper.entityToDomain(userEntity);
  }

  async findById(id: number): Promise<User | null> {
    const userEntity = this.repository.findOne({ where: { id } });

    return userEntity.then((userEntity) => {
      if (!userEntity) return null;
      return UserMapper.entityToDomain(userEntity);
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = this.repository.findOne({ where: { email } });

    return userEntity.then((userEntity) => {
      if (!userEntity) return null;
      return UserMapper.entityToDomain(userEntity);
    });
  }

  async verifyCredentials(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.repository.findOne({ where: { email } });

    if (!user) return null;

    const isPasswordValid = await this.encryptHandler.verify(
      password,
      user.password,
    );

    return isPasswordValid ? user : null;
  }
}
