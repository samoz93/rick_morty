import { useCallback, useState } from "react";
import { logService } from "../logic/services/log.service";
import { ExpectedError } from "../logic/models";

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const load = async <T>(promise: Promise<T>): Promise<T | undefined> => {
    setIsLoading(true);
    try {
      const result = await promise;
      setIsLoading(false);
      return result;
    } catch (err) {
      logService.logError(err);
      if (err instanceof ExpectedError) {
        setError(err as Error);
      } else {
        // This will trigger the error in async function calls => we can catch the error in the global error boundary
        setError(() => {
          throw err;
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [isLoading, error, load] as const;
};
