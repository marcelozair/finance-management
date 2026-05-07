import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './DataSource';

@Module({
  exports: [],
  providers: [],
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => dataSourceOptions,
      imports: [],
      inject: [],
    }),
  ],
})
export class DatabaseModule {}
