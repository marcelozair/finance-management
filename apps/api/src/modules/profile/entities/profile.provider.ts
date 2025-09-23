import { DataSource, Repository } from 'typeorm';

import { ProfileEntity } from './profile.entity';
import { DatabaseProviderName } from 'src/modules/database/database.config';

export type ProfileRepositoryEntity = Repository<ProfileEntity>;
export const ProfileRepositoryName = 'PROFILE_REPOSITORY';

export const ProfileRepositoryProvider = {
  provide: ProfileRepositoryName,
  inject: [DatabaseProviderName],
  useFactory: (connection: DataSource) =>
    connection.getRepository(ProfileEntity),
};
