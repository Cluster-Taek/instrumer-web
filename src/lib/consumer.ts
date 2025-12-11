import { useQuery } from '@tanstack/react-query';
import { IBaseResponse } from '@/types/api';
import { IConsumerInfo } from '@/types/consumer';

// 수요기업 정보 조회
export const useConsumer = (consumerSeq?: number) => {
  return useQuery<IBaseResponse<IConsumerInfo>>({
    queryKey: ['/api/b2b-service/consumer', { consumerSeq }],
    enabled: !!consumerSeq,
  });
};
