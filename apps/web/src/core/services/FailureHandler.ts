/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";

import {
  BadRequestFailure,
  ConflictFailure,
  ForbiddenFailure,
  NetworkUnavailableFailure,
  ResourceNotFoundFailure,
  TooManyRequestsFailure,
  UnauthorizedFailure,
  UnknownServerFailure,
  UnprocessableFailure,
  type Failure,
} from "../errors/Failures";
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NetworkUnavailableException,
  ResourceNotFoundException,
  ServerException,
  TooManyRequestsException,
  UnauthorizedException,
  UnknownServerException,
  UnprocessableException,
} from "../errors/Exceptions";

import type { IFailureHandler } from "../interfaces/IFailureHanlder";
import type { CustomErrorMessages } from "../interfaces/ICustomErrorMessages";

import { toaster } from "@shared/presentation/ui/Toaster";

export class FailureHandler implements IFailureHandler {
  private mapStatusCodeToException(statusCode: number): ServerException {
    switch (Number(statusCode)) {
      case 400:
        return new BadRequestException();
      case 401:
        return new UnauthorizedException();
      case 403:
        return new ForbiddenException();
      case 404:
        return new ResourceNotFoundException();
      case 409:
        return new ConflictException();
      case 422:
        return new UnprocessableException();
      case 429:
        return new TooManyRequestsException();
      case 500:
        return new ServerException();
      default:
        return new UnknownServerException();
    }
  }

  mapErrorToException(error: any): ServerException {
    const statusCode = Number(error.statusCode || error["statusCode"]);

    if (statusCode) {
      return this.mapStatusCodeToException(statusCode);
    } else if (axios.isAxiosError(error) && error.response?.status) {
      toaster.create({
        type: "error",
        title: error.response?.data?.message,
      });

      return this.mapStatusCodeToException(error.response?.status);
    }

    toaster.create({
      type: "error",
      title: "Internal server error, please try later",
    });

    return new UnknownServerException();
  }

  logAndMapExceptionToFailure(e: any): Failure {
    // Add debugging log to check the contents of the exception object
    // console.warn("Exception object:", e);

    if (e instanceof NetworkUnavailableException) {
      return new NetworkUnavailableFailure();
    }

    if (e instanceof BadRequestException) {
      return new BadRequestFailure();
    }

    if (e instanceof ResourceNotFoundException) {
      return new ResourceNotFoundFailure();
    }

    if (e instanceof TooManyRequestsException) {
      return new TooManyRequestsFailure();
    }

    if (e instanceof ConflictException) {
      return new ConflictFailure();
    }

    if (e instanceof UnprocessableException) {
      return new UnprocessableFailure();
    }

    if (e instanceof UnauthorizedException) {
      return new UnauthorizedFailure();
    }

    if (e instanceof ForbiddenException) {
      return new ForbiddenFailure();
    }

    if (e && e.status) {
      const exception = this.mapStatusCodeToException(e.status);
      return this.logAndMapExceptionToFailure(exception);
    }

    return new UnknownServerFailure();
  }

  handleServerFailure = async (
    failure: Failure,
    customErrorMessages: CustomErrorMessages
  ) => {
    const defaultErrorMessages = {
      apiError: "There was an error with the API, please try again",
      forbidden: "You are forbidden to perform this action",
      unauthorized: "You are not authorized to perform this action",
      unprocessable:
        "The request made cannot be processed, check your parameters",
      resourceUnavailable: "The resource was not found",
    };

    const messages = Object.assign(defaultErrorMessages, customErrorMessages);
    console.error(messages);

    if (failure) {
      console.error("Handling failure: ", failure);

      //   if (failure instanceof NetworkUnavailableFailure) {
      //     this.messageService.error(
      //       "There is no internet access, please check your connection"
      //     );
      //   } else if (failure instanceof BadRequestFailure) {
      //     this.messageService.error("The request made is not correct");
      //   } else if (failure instanceof SlowInternetFailure) {
      //     this.messageService.error(
      //       "Your internet is slow, please check your connection"
      //     );
      //   } else if (failure instanceof TimeoutFailure) {
      //     this.messageService.error("The action has timed out");
      //   } else if (failure instanceof TooManyRequestsFailure) {
      //     this.messageService.error(
      //       "You have reached the request limit for this action"
      //     );
      //   } else if (failure instanceof ApiUnavailableFailure) {
      //     this.messageService.error(
      //       "The API is currently unavailable, please try again later"
      //     );
      //   } else if (failure instanceof ConflictFailure) {
      //     this.messageService.error(
      //       "There was a conflict in the request, check your parameters"
      //     );
      //   } else if (failure instanceof UnauthorizedFailure) {
      //     this.messageService.error(messages.unauthorized);
      //   } else if (failure instanceof ForbiddenFailure) {
      //     this.messageService.error(messages.forbidden);
      //   } else if (failure instanceof UnprocessableFailure) {
      //     this.messageService.error(messages.unprocessable);
      //   } else if (failure instanceof ResourceNotFoundFailure) {
      //     this.messageService.error(messages.resourceUnavailable);
      //   } else if (failure instanceof ApiErrorFailure) {
      //     this.messageService.error(messages.apiError);
      //   } else {
      //     this.messageService.error("An unknown error happened");
      //   }
      // } else {
      //   this.messageService.error("An unknown error happened");
    }
  };
}
