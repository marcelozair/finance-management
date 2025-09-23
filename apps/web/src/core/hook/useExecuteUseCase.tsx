import { useState } from "react";

interface ExecuteUseCaseProps<T, P> {
  callback: (params: P) => Promise<T>;
}

export const useExecuteUseCase = <T, P>({
  callback,
}: ExecuteUseCaseProps<T, P>) => {
  const [loading, setLoading] = useState(false);

  const execute = async (params: P): Promise<T> => {
    setLoading(true);

    try {
      const response = await callback(params);
      return response;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    execute,
  };
};
