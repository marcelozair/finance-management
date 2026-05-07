import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST ?? 'localhost',
  username: process.env.DATABASE_USER ?? 'postgres',
  database: process.env.DATABASE_NAME ?? 'postgres',
  password: process.env.DATABASE_PASSWORD ?? 'postgres',
  port: Number(process.env.DATABASE_PORT) || 5432,
  synchronize: false,
  ssl: process.env.ENV !== 'development',
  logging: process.env.ENV === 'development',
  entities: [__dirname + '/../**/*Entity{.ts,.js}'],
  migrations: [__dirname + '/../**/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
