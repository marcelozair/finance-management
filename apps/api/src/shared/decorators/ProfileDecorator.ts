import {
  HttpException,
  ExecutionContext,
  createParamDecorator,
  HttpStatus,
} from '@nestjs/common';

class MissingProfileInRequest extends HttpException {
  constructor() {
    super('Invalid request, profile is required', HttpStatus.CONFLICT);
  }
}

export const Profile = createParamDecorator(
  (_: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    if (!request['profileId']) throw new MissingProfileInRequest();
    return request['profileId'] as number;
  },
);
