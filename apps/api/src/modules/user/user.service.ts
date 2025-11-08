import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { UserEntity } from './entities/user.entity';
import { CreateUserDTO } from './domain/dto/createUser.dto';
import { UserRepository } from './domain/repository/user.repository';

@Injectable()
export class UserService {
  @Inject(UserRepository)
  private readonly userRepository: UserRepository;

  async create(user: CreateUserDTO): Promise<UserEntity> {
    const userExists = await this.userRepository.findByEmail(user.email);

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const userEntity = this.userRepository.create(user);

    return userEntity;
  }
}
