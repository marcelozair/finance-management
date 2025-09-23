import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { DatabaseProviderName } from 'src/modules/database/database.config';

export type UserRepositoryEntity = Repository<UserEntity>;
export const UserRepositoryName = 'USER_REPOSITORY';

export const UserRepositoryProvider = {
  provide: UserRepositoryName,
  inject: [DatabaseProviderName],
  useFactory: (connection: DataSource) => connection.getRepository(UserEntity),
};
