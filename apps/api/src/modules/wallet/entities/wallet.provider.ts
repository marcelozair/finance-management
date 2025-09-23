import { DataSource, Repository } from 'typeorm';

import { WalletEntity } from './wallet.entity';
import { DatabaseProviderName } from 'src/modules/database/database.config';

export type WalletRepositoryEntity = Repository<WalletEntity>;
export const WalletRepositoryName = 'ACCOUNT_REPOSITORY';

export const WalletRepositoryProvider = {
  provide: WalletRepositoryName,
  inject: [DatabaseProviderName],
  useFactory: (connection: DataSource) =>
    connection.getRepository(WalletEntity),
};
