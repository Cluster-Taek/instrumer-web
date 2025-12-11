import { fetchApi } from './base';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { IBaseResponse } from '@/types/api';
import {
  ISavePaymentEventRequest,
  ISavePaymentEventResponse,
  ITossPaymentApprovalRequest,
  IRefundRequest,
  IPaymentEventOrder,
} from '@/types/payment';

// 결제 요청 생성
export const useCreatePaymentEventMutation = () => {
  return useMutation({
    mutationFn: async (data: ISavePaymentEventRequest) =>
      await fetchApi.post<IBaseResponse<ISavePaymentEventResponse>>('/api/payment-service/payment-event', data),
  });
};

// 결제 요청 주문내역 조회
export const usePaymentEventOrder = (paymentEventSeq?: number) => {
  return useQuery<IBaseResponse<IPaymentEventOrder>>({
    queryKey: ['/api/payment-service/payment-event/order', { paymentEventSeq }],
    enabled: !!paymentEventSeq,
  });
};

// 결제 요청 중복확인
export const usePaymentEventConflict = (vendorSeq?: number, consumerSeq?: number, category?: string) => {
  return useQuery<IBaseResponse<boolean>>({
    queryKey: ['/api/payment-service/payment-event/conflict', { vendorSeq, consumerSeq, category }],
    enabled: !!vendorSeq && !!consumerSeq && !!category,
  });
};

// Toss 결제 승인
export const useTossPaymentApprovalMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ITossPaymentApprovalRequest) =>
      await fetchApi.post('/api/payment-service/toss/approval', data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/api/payment-service/payment-event'],
        refetchType: 'all',
      });
    },
  });
};

// Toss 결제 환불
export const useTossRefundMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IRefundRequest) => await fetchApi.post('/api/payment-service/toss/refund', data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['/api/payment-service/payment-event'],
        refetchType: 'all',
      });
    },
  });
};
