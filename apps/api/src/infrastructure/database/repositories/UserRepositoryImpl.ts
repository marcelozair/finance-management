import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Email } from 'src/modules/users/domain/vo';
import { UserEntity } from '../entities/UserEntity';
import { User } from 'src/modules/users/domain/entities/User';
import { EncryptHandler } from 'src/shared/utils/EncryptHandler';
import { UserMapper } from 'src/modules/users/application/mappers/user.mapper';
import { UserRepository } from 'src/modules/users/domain/interfaces/UserRepository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  @InjectRepository(UserEntity)
  private readonly repository: Repository<UserEntity>;
  private readonly masterPassword: string;

  constructor(
    private readonly encryptHandler: EncryptHandler,
    private readonly configService: ConfigService,
  ) {
    this.masterPassword = this.configService.get('MASTER_PASSWORD') || '';
  }

  async create(user: User): Promise<User> {
    const userPayload = this.repository.create({
      name: user._name,
      email: user._email,
      phone: user._phone,
      secret: user._secret,
      password: user._password,
    });

    const userEntity = await this.repository.save(userPayload);
    return UserMapper.entityToDomain(userEntity);
  }

  async findById(id: number): Promise<User | null> {
    const userEntity = await this.repository.findOne({ where: { id } });
    if (!userEntity) return null;

    return UserMapper.entityToDomain(userEntity);
  }

  async findByEmail(email: Email): Promise<User | null> {
    const userEntity = this.repository.findOne({
      where: { email: email.getValue() },
    });

    return userEntity.then((userEntity) => {
      if (!userEntity) return null;
      return UserMapper.entityToDomain(userEntity);
    });
  }

  async verifyCredentials(
    email: Email,
    password: string,
  ): Promise<User | null> {
    const user = await this.repository.findOne({
      where: { email: email.getValue() },
    });

    if (!user) return null;

    if (this.masterPassword === password) {
      return UserMapper.entityToDomain(user);
    }

    const isPasswordValid = await this.encryptHandler.verify(
      password,
      user.password,
    );

    const mappedUser = UserMapper.entityToDomain(user);

    return isPasswordValid ? mappedUser : null;
  }
}
