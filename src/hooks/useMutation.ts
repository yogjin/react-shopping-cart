import { useState } from 'react';

/**
 * V: update fetch 시 body에 들어갈 valiables
 * R: Response 타입
 */
type MutationFn<V, R> = (variables: V) => Promise<R>;

type Options<R> = {
  onSuccess?: (data: R) => void;
  onError?: (error: Error) => void;
};

const useMutation = <V, R>(mutationFn: MutationFn<V, R>, { onSuccess, onError }: Options<R>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = (variables: V) => {
    setIsLoading(true);

    mutationFn(variables)
      .then((response) => {
        onSuccess?.(response);
      })
      .catch((error) => {
        setError(error);
        onError?.(error);
      })
      .finally(() => {
        setError(null);
        setIsLoading(false);
      });
  };

  return { mutate, isLoading, error };
};

export { useMutation };
