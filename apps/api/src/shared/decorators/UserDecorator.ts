import { createParamDecorator, ExecutionContext } from '@nestjs/common';

class MissingUserIdInRequest extends Error {
  constructor() {
    super('Invalid request, userId is required for this operation');
  }
}

export const UserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request['userId']) throw new MissingUserIdInRequest();
    return request['userId'] as number;
  },
);
