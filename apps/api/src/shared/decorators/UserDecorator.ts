import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

class MissingUserIdInRequest extends HttpException {
  constructor() {
    super(
      'Invalid request, userId is required for this operation',
      HttpStatus.CONFLICT,
    );
  }
}

export const UserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request['userId']) throw new MissingUserIdInRequest();
    return request['userId'] as number;
  },
);
