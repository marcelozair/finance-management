import { Response } from 'express';
import { I18nService } from 'nestjs-i18n';
import { ValidationError } from 'class-validator';

import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  ExceptionFilter,
} from '@nestjs/common';

@Catch(ValidationError)
export class RequestExceptionHandler implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  catch(exception: ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // Get request context
    const response = ctx.getResponse<Response>(); // Obtain response instance to return response

    const statusCode = HttpStatus.BAD_REQUEST;
    const message = this.i18n.t('global.INVALID_REQUEST', {
      args: { properties: exception.property },
    });

    response.status(statusCode).json({
      message,
      statusCode,
      error: 'Bad Request Payload',
    });
  }
}
