import { Module } from '@nestjs/common';

import { EncryptHandler } from 'src/core/utils/CryptHandler';
import { DatabaseProvider } from '../database/database.config';
import { ProfileRepository } from '../profile/profile.repository';
import { UserRepositoryProvider } from '../user/entities/user.provider';
import { UserRepository } from '../user/domain/repository/user.repository';
import { ProfileRepositoryProvider } from '../profile/entities/profile.provider';

@Module({
  exports: [
    UserRepository,
    ProfileRepository,
    DatabaseProvider,
    EncryptHandler,
  ],
  providers: [
    EncryptHandler,
    UserRepository,
    DatabaseProvider,
    ProfileRepository,
    UserRepositoryProvider,
    ProfileRepositoryProvider,
  ],
})
export class AuthContextModule {}
