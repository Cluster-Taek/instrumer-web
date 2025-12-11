import { fetchApi } from './base';
import { IBaseResponse } from '@/types/api';
import { Category, ISaveSolutionRequest, ISaveSolutionResponse, ISolution, ISolutionListItem } from '@/types/solution';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export interface ISolutionListParams {
  category?: Category;
  budget?: string;
  keyword?: string;
  start?: number;
  end?: number;
}

export interface ISolutionFormValue extends Omit<ISaveSolutionRequest, 'vendorSeq'>, Record<string, unknown> {
  representImageUrl?: File;
  descriptionPdfUrl?: File;
}

// 솔루션 목록 조회
export const useSolutions = (params?: ISolutionListParams) => {
  return useQuery<IBaseResponse<ISolutionListItem[]>>({
    queryKey: ['/api/solution-service/solution/list', params],
  });
};

// 솔루션 상세 조회
export const useSolution = (solutionSeq?: number) => {
  return useQuery<IBaseResponse<ISolution>>({
    queryKey: ['/api/solution-service/solution', { solutionSeq }],
    enabled: !!solutionSeq,
  });
};

// 카테고리별 솔루션 조회
export const useSolutionByCategory = (vendorSeq?: number, category?: Category) => {
  return useQuery<IBaseResponse<ISolution>>({
    queryKey: ['/api/solution-service/solution/category', { vendorSeq, category }],
    enabled: !!vendorSeq && !!category,
  });
};

// 솔루션 생성
export const useCreateSolutionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) =>
      await fetchApi.post<IBaseResponse<ISaveSolutionResponse>>('/api/solution-service/solution', data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/api/solution-service/solution/list'],
        refetchType: 'all',
      });
    },
  });
};

// 솔루션 수정
export const useUpdateSolutionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) =>
      await fetchApi.put<IBaseResponse<string>>('/api/solution-service/solution', data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/api/solution-service/solution'],
        refetchType: 'all',
      });
    },
  });
};

// 솔루션 삭제
export const useDeleteSolutionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (solutionSeq: number) =>
      await fetchApi.delete<IBaseResponse<string>>(`/api/solution-service/solution?solutionSeq=${solutionSeq}`),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/api/solution-service/solution/list'],
        refetchType: 'all',
      });
    },
  });
};
