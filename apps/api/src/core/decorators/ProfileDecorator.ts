import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Profile = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request['profileId'] as number;
  },
);
