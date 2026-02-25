import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
