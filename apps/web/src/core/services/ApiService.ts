/* eslint-disable @typescript-eslint/no-explicit-any */
import { type AxiosInstance } from "axios";

import type { IFailureHandler } from "../interfaces/IFailureHanlder";
import type { CreateApiClient } from "./CreateApiClient";

export enum HttpMethod {
  POST = "post",
  GET = "get",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}

export interface APIResponse<T> {
  message: string;
  statusCode: number;
  error?: string;
  data: T;
}

export class BaseService {
  protected client: AxiosInstance;
  private failureHandler: IFailureHandler;

  constructor(client: AxiosInstance, failureHandler: IFailureHandler) {
    this.client = client;

    this.failureHandler = failureHandler;
  }

  private async sendRequest<T>(
    method: HttpMethod,
    endpoint: string,
    data?: any,
    params?: any,
  ): Promise<APIResponse<T>> {
    try {
      const endpointParsed = `/${endpoint}`;

      let response;
      if (method === HttpMethod.GET) {
        response = await this.client.get<T>(endpointParsed, {
          params: data,
        });
      } else {
        response = await this.client[method]<T>(endpointParsed, data, {
          params,
        });
      }

      return response.data as APIResponse<T>;
    } catch (error: any) {
      throw this.failureHandler.mapErrorToException(error);
    }
  }

  async get<T>(endpoint: string, params?: any): Promise<APIResponse<T>> {
    return this.sendRequest<T>(HttpMethod.GET, endpoint, params);
  }

  async post<T>(endpoint: string, body?: any): Promise<APIResponse<T>> {
    return this.sendRequest<T>(HttpMethod.POST, endpoint, body);
  }

  async put<T>(endpoint: string, body?: any): Promise<APIResponse<T>> {
    return this.sendRequest<T>(HttpMethod.PUT, endpoint, body);
  }

  async delete<T>(
    endpoint: string,
    id: string,
    body?: any,
  ): Promise<APIResponse<T>> {
    const endpointWithId = `${endpoint}/${id}`;
    return this.sendRequest<T>(HttpMethod.DELETE, endpointWithId, body);
  }

  async update<T>(
    endpoint: string,
    id: string,
    body?: any,
  ): Promise<APIResponse<T>> {
    const endpointWithId = `${endpoint}/${id}`;
    return this.sendRequest<T>(HttpMethod.PUT, endpointWithId, body);
  }
}

export class ApiService extends BaseService {
  constructor(createdApi: CreateApiClient, failureHandler: IFailureHandler) {
    super(createdApi.apiClient, failureHandler);
  }
}
