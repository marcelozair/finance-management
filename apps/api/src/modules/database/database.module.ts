import { Module } from '@nestjs/common';

import { DatabaseProvider } from './database.config';

@Module({
  imports: [],
  providers: [DatabaseProvider],
  exports: [DatabaseProvider],
})
export class DatabaseModule {}
