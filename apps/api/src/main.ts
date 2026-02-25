import { I18nService } from 'nestjs-i18n';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationError } from 'class-validator';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { ResponseInterceptor } from './core/middleware/responseInterceptor.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const i18nService: I18nService<Record<string, string>> = app.get(I18nService);

  const PORT = configService.get<number>('PORT') || 8081;

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const errorProperties = errors.reduce(
          (acc, curr) => (acc ? `${acc}, ${curr.property}` : curr.property),
          '',
        );

        const message = i18nService.t('global.INVALID_REQUEST', {
          args: { properties: errorProperties },
        });

        throw new BadRequestException(message);
      },
    }),
  );

  await app.listen(PORT);
}

bootstrap();
