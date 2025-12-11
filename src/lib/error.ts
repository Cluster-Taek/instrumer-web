import { AxiosError } from 'axios';
import { IApiError } from '@/types/error';
import { DEFAULT_ERROR_MESSAGE, ERROR_MESSAGES } from '@/constants/error-codes';

export const parseApiError = (error: unknown): IApiError | null => {
  const axiosError = error as AxiosError<IApiError>;
  return axiosError.response?.data ?? null;
};

export const getErrorMessage = (error: unknown): string => {
  const apiError = parseApiError(error);
  if (!apiError) return DEFAULT_ERROR_MESSAGE;

  return ERROR_MESSAGES[apiError.code] ?? apiError.message ?? DEFAULT_ERROR_MESSAGE;
};

export const isUnauthorizedError = (error: unknown): boolean => {
  const apiError = parseApiError(error);
  return apiError?.httpStatus === 401;
};
