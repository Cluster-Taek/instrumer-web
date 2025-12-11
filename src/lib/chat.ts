import { fetchApi } from './base';
import { useQuery, useMutation } from '@tanstack/react-query';
import { IBaseResponse } from '@/types/api';
import { IChatFile } from '@/types/chat';

// 채팅 파일 조회
export const useChatFile = (chatUniqueType?: string) => {
  return useQuery<IBaseResponse<IChatFile>>({
    queryKey: ['/api/b2b-service/chat', { chatUniqueType }],
    enabled: !!chatUniqueType,
  });
};

// 채팅 파일 저장
export const useSaveChatMutation = () => {
  return useMutation({
    mutationFn: async (data: FormData) => await fetchApi.post<IBaseResponse<string>>('/api/b2b-service/chat', data),
  });
};
