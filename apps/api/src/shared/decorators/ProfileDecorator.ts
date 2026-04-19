import { createParamDecorator, ExecutionContext } from '@nestjs/common';

class MissingProfileInRequest extends Error {
  constructor() {
    super('Invalid request, profile-id is required');
  }
}

export const Profile = createParamDecorator(
  (_: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    if (!request['profileId']) throw new MissingProfileInRequest();
    return request['profileId'] as number;
  },
);
