import { fetchApi } from './base';
import { IBaseResponse } from '@/types/api';

interface IGetPresignedUrlRequest {
  fileName: string;
  expiration?: number; // minutes
}

export interface IPresignedUrlResponse {
  url: string;
}

// 파일 업로드 전 전용 URL 발급
export const getPresignedUrl = ({ fileName, expiration = 5 }: IGetPresignedUrlRequest) => {
  return fetchApi.post<IBaseResponse<IPresignedUrlResponse>>('/api/common-service/auth/presigned-url', {
    fileName,
    expiration,
  });
};
