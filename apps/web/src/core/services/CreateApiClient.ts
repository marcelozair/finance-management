import axios, { type AxiosInstance } from "axios";

export interface IApiClientConfig {
  baseUrl: string;
  language: string;
}

export class CreateApiClient {
  readonly apiClient: AxiosInstance;

  constructor({ baseUrl, language }: IApiClientConfig) {
    this.apiClient = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": language,
      },
    });
  }
}
