import { DataSource } from 'typeorm';

export const DatabaseProviderName = 'DATABASE_RROVIDER';

export const DatabaseProvider = {
  provide: DatabaseProviderName,
  useFactory: async () => {
    const dataSource = new DataSource({
      type: 'postgres',

      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      port: Number(process.env.DATABASE_PORT),

      logging: true,
      synchronize: true,

      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    });

    return dataSource.initialize();
  },
};
