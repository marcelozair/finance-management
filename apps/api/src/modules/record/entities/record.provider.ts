import { DataSource, Repository } from 'typeorm';
import { DatabaseProviderName } from 'src/modules/database/database.config';
import { RecordEntity } from './record.entity';

export type RecordRepositoryEntity = Repository<RecordEntity>;
export const RecordRepositoryName = 'RECORD_REPOSITORY';

export const RecordRepositoryProvider = {
  provide: RecordRepositoryName,
  inject: [DatabaseProviderName],
  useFactory: (connection: DataSource) =>
    connection.getRepository(RecordEntity),
};
