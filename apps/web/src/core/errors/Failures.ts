/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class Failure {
  constructor(public properties: any[] = []) {}

  equals(other: Failure): boolean {
    return JSON.stringify(this.properties) === JSON.stringify(other.properties);
  }
}

export class ServerFailure extends Failure {}

export class NetworkUnavailableFailure extends ServerFailure {}

export class SlowInternetFailure extends ServerFailure {}

export class TimeoutFailure extends ServerFailure {}

export class TooManyRequestsFailure extends ServerFailure {}

export class ApiUnavailableFailure extends ServerFailure {}

export class UnauthorizedFailure extends ServerFailure {}

export class ForbiddenFailure extends ServerFailure {}

export class UnprocessableFailure extends ServerFailure {}

export class ResourceNotFoundFailure extends ServerFailure {}

export class BadRequestFailure extends ServerFailure {}

export class ConflictFailure extends ServerFailure {}

export class ApiErrorFailure extends ServerFailure {}

export class UnknownServerFailure extends ServerFailure {}
