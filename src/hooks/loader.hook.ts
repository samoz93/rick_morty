import { useState } from "react";
import { ExpectedError } from "../logic";

export const useInfiniteLoader = <T>() => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T[]>([]);

  const errorHandler = (err: any) => {
    if (err instanceof ExpectedError) {
      setError(err as Error);
    } else {
      // This will trigger the error in async function calls => we can catch the error in the global error boundary
      setError(() => {
        throw err;
      });
    }
  };

  const fetch = async (promise: Promise<T[]>) => {
    setIsLoading(true);

    try {
      const result = await promise;
      setData(result);
    } catch (err) {
      errorHandler(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMore = async (promise: Promise<T[]>) => {
    setIsFetchingMore(true);
    try {
      const result = await promise;
      setData((prev) => [...prev, ...result]);
    } catch (err) {
      errorHandler(err);
    } finally {
      setIsFetchingMore(false);
    }
  };

  return { isLoading, isFetchingMore, error, data, fetch, fetchMore } as const;
};
