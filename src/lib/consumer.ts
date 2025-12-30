import { fetchApi } from './base';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { IBaseResponse } from '@/types/api';
import { IGetConsumerResponse, IUpdateConsumerRequest } from '@/types/consumer';

// 수요기업 정보 조회
export const useConsumer = () => {
  return useQuery<IBaseResponse<IGetConsumerResponse>>({
    queryKey: ['/api/consumer'],
  });
};

// 수요기업 정보 수정
export const useUpdateConsumerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IUpdateConsumerRequest) =>
      await fetchApi.put<IBaseResponse<string>>('/api/consumer', data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/api/consumer'],
      });
    },
  });
};
