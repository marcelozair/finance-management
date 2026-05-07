/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Failure } from "../errors/Failures";
import type { ServerException } from "../errors/Exceptions";
import type { CustomErrorMessages } from "./ICustomErrorMessages";

export interface IFailureHandler {
  mapErrorToException(error: any): ServerException;
  logAndMapExceptionToFailure(e: any): Failure;
  handleServerFailure(
    failure: Failure | null,
    customErrorMessages: CustomErrorMessages,
  ): Promise<void>;
}
