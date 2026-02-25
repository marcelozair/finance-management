import * as path from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { I18nModule, AcceptLanguageResolver } from 'nestjs-i18n';

import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './shared/infrastructure/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    I18nModule.forRoot({
      loaderOptions: {
        path: path.join(__dirname, '/shared/i18n/'),
        watch: true,
      },
      fallbackLanguage: 'en',
      resolvers: [new AcceptLanguageResolver()],
    }),
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
