'use client';

import { useAlert } from './alert-provider';
import { fetchApi } from '@/lib/base';
import { getErrorMessage, isUnauthorizedError } from '@/lib/error';
import { getClearObject } from '@/utils/utils';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider, keepPreviousData } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const { alert } = useAlert();

  const fetcher = async (url: string, params?: Record<string, unknown>) => {
    return fetchApi.get(url, params);
  };

  const handleError = (error: Error) => {
    if (isUnauthorizedError(error)) return;

    alert({
      variant: 'error',
      children: getErrorMessage(error),
    });
  };

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: handleError,
        }),
        mutationCache: new MutationCache({
          onError: handleError,
        }),
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: 1000 * 60,
            gcTime: 1000 * 60 * 5,
            throwOnError: true,
            queryFn: ({ queryKey }) =>
              fetcher(queryKey[0] as string, queryKey[1] ? getClearObject(queryKey[1]) : undefined),
            placeholderData: keepPreviousData,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  );
};
