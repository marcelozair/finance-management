export interface ApiRes<T> {
  message: string;
  statusCode: number;
  error?: string;
  data: T;
}
