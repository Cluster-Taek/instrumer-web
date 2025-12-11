import { fetchApi } from './base';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { IBaseResponse } from '@/types/api';
import { ISolutionReview, ISaveReviewRequest, IModifyReviewRequest, ISaveReviewResponse } from '@/types/review';

// 솔루션별 리뷰 조회
export const useSolutionReviews = (solutionSeq?: number) => {
  return useQuery<IBaseResponse<ISolutionReview[]>>({
    queryKey: ['/api/solution-service/review', { solutionSeq }],
    enabled: !!solutionSeq,
  });
};

// 리뷰 작성
export const useCreateReviewMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ISaveReviewRequest) =>
      await fetchApi.post<IBaseResponse<ISaveReviewResponse>>('/api/solution-service/review', data),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ['/api/solution-service/review', { solutionSeq: variables.solutionSeq }],
      });
    },
  });
};

// 리뷰 수정
export const useUpdateReviewMutation = (solutionSeq?: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IModifyReviewRequest) =>
      await fetchApi.put<IBaseResponse<string>>('/api/solution-service/review', data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/api/solution-service/review', { solutionSeq }],
      });
    },
  });
};

// 리뷰 삭제
export const useDeleteReviewMutation = (solutionSeq?: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (solutionReviewSeq: number) =>
      await fetchApi.delete<IBaseResponse<string>>(`/api/solution-service/review?solutionReviewSeq=${solutionReviewSeq}`),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/api/solution-service/review', { solutionSeq }],
      });
    },
  });
};
