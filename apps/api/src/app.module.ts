import * as path from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { I18nModule, AcceptLanguageResolver } from 'nestjs-i18n';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { RecordModule } from './modules/record/record.module';
import { ProfileModule } from './modules/profile/profile.module';
import { DatabaseModule } from './modules/database/database.module';
import { AuthContextModule } from './modules/auth-context/auth-context.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }), // Set up environment file configurations

    I18nModule.forRoot({
      fallbackLanguage: 'en', // Fallback language if requested one is not available
      loaderOptions: {
        path: path.join(__dirname, '/shared/i18n/'), // Path to your translation files
        watch: true, // Watch for changes in translation files
      },
      resolvers: [
        new AcceptLanguageResolver(), // This resolves language from the "Accept-Language" header
      ],
    }),

    // Register application Moduels below
    AuthModule,
    UserModule,
    RecordModule,
    ProfileModule,
    WalletModule,
    DatabaseModule,
    AuthContextModule,
  ],
})
export class AppModule {}
