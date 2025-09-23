export interface IResponseHandler<T> {
  message: string;
  data: T;
}

export const ResHandler = <T>(
  data: T,
  message = 'success',
): IResponseHandler<T> => {
  return {
    message,
    data,
  };
};
