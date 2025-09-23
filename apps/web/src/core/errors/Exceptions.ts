export class ServerException extends Error {}

export class ChatException extends Error {
  constructor(message?: string) {
    super(message ?? 'Something went wrong during websocket chat streaming');
    this.name = 'ChatException';
  }
}

export class NetworkUnavailableException extends Error {}

export class ResourceNotFoundException extends Error {}

export class UnauthorizedException extends Error {}

export class ForbiddenException extends Error {}

export class UnprocessableException extends Error {}

export class UnknownServerException extends Error {}

export class BadRequestException extends Error {}

export class TooManyRequestsException extends Error {}

export class ConflictException extends Error {}

export class PersistenceException extends Error {}

export class SecuredPersistenceException extends Error {}
