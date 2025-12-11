import { useQuery } from '@tanstack/react-query';
import { IBaseResponse } from '@/types/api';
import {
  IVendorStat,
  IVendorDashboard,
  IVendorDashboardDoneItem,
  IVendorDashboardSettledItem,
  IConsumerDashboardItem,
} from '@/types/dashboard';
import { PaymentStatus } from '@/types/payment';

export interface IVendorDashboardListParams {
  vendorSeq?: number;
  paymentStatus?: PaymentStatus;
  start?: number;
  end?: number;
}

export interface IConsumerDashboardParams {
  consumerSeq?: number;
  paymentStatus?: PaymentStatus;
  start?: number;
  end?: number;
}

// 벤더 통계 조회
export const useVendorStat = (vendorSeq?: number) => {
  return useQuery<IBaseResponse<IVendorStat>>({
    queryKey: ['/api/b2b-service/stat', { vendorSeq }],
    enabled: !!vendorSeq,
  });
};

// 벤더 대시보드 요약 조회
export const useVendorDashboard = (vendorSeq?: number) => {
  return useQuery<IBaseResponse<IVendorDashboard>>({
    queryKey: ['/api/b2b-service/dashboard/vendor/count', { vendorSeq }],
    enabled: !!vendorSeq,
  });
};

// 벤더 대시보드 리스트 조회 (DONE)
export const useVendorDashboardDoneList = (params: IVendorDashboardListParams) => {
  return useQuery<IBaseResponse<IVendorDashboardDoneItem[]>>({
    queryKey: ['/api/b2b-service/dashboard/vendor', { ...params, paymentStatus: 'DONE' }],
    enabled: !!params.vendorSeq,
  });
};

// 벤더 대시보드 리스트 조회 (SETTLED)
export const useVendorDashboardSettledList = (params: IVendorDashboardListParams) => {
  return useQuery<IBaseResponse<IVendorDashboardSettledItem[]>>({
    queryKey: ['/api/b2b-service/dashboard/vendor', { ...params, paymentStatus: 'SETTLED' }],
    enabled: !!params.vendorSeq,
  });
};

// 수요기업 대시보드 조회
export const useConsumerDashboard = (params: IConsumerDashboardParams) => {
  return useQuery<IBaseResponse<IConsumerDashboardItem[]>>({
    queryKey: ['/api/b2b-service/dashboard/consumer', params],
    enabled: !!params.consumerSeq,
  });
};
