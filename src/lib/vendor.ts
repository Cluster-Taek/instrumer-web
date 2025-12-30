import { fetchApi } from './base';
import { IBaseResponse } from '@/types/api';
import { IGetVendorResponse, IUpdateVendorRequest } from '@/types/vendor';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 벤더 정보 조회
export const useVendor = () => {
  return useQuery<IBaseResponse<IGetVendorResponse>>({
    queryKey: ['/api/vendor'],
  });
};

// 벤더 정보 수정
export const useUpdateVendorMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IUpdateVendorRequest) =>
      await fetchApi.put<IBaseResponse<string>>('/api/vendor', data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/api/vendor'],
      });
    },
  });
};
