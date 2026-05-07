import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { DataSource } from 'typeorm';
// import { DataSourceOptions } from 'typeorm/browser';

@Module({
  exports: [],
  providers: [],
  imports: [
    // Ensure only one initialization of database
    // TypeOrmModule.forRootAsync(databaseConfiguration)
    TypeOrmModule.forRootAsync({
      imports: [],
      useFactory: (configService: ConfigService) => {
        const ENV = configService.get<string>('ENV', 'production');

        return {
          type: 'postgres',
          host: configService.get<string>('DATABASE_HOST', 'localhost'),
          username: configService.get<string>('DATABASE_USER', 'postgres'),
          database: configService.get<string>('DATABASE_NAME', 'postgres'),
          password: configService.get<string>('DATABASE_PASSWORD', 'postgres'),
          port: configService.get<number>('DATABASE_PORT', 8080),
          logging: ENV === 'development',
          synchronize: ENV === 'development',
          entities: [__dirname + '/../**/*Entity{.ts,.js}'],
        };
      },
      // dataSourceFactory: async (options) => {
      //   if (!options) {
      //     throw new Error('DataSource options are not defined');
      //   }
      //   const dataSource = new DataSource(options);
      //   await dataSource.initialize();
      //   const schemas = ['finance', 'core'];
      //   for (const schema of schemas) {
      //     console.log('Creating schemas ....', schema);
      //     await dataSource.query(`CREATE SCHEMA IF NOT EXISTS "${schema}"`);
      //   }
      //   return dataSource;
      // },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
