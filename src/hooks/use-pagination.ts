'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface IUsePaginationOptions {
  pageSize?: number;
  paramName?: string;
}

export const usePagination = (options: IUsePaginationOptions = {}) => {
  const { pageSize = 20, paramName = 'page' } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get(paramName)) || 1;
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete(paramName);
    } else {
      params.set(paramName, String(page));
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return {
    currentPage,
    start,
    end,
    pageSize,
    setPage,
  };
};
