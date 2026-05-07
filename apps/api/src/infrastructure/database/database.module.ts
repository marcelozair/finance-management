import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dataSourceOptions } from './DataSource';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions as TypeOrmModuleOptions)],
})
export class DatabaseModule {}
