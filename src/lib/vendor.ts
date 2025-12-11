import { IBaseResponse } from '@/types/api';
import { IVendorInfo, IVendorSolution, IVendorSolutionCategory } from '@/types/vendor';
import { useQuery } from '@tanstack/react-query';

export interface IVendorParams {
  vendorSeq?: number;
}

// 벤더 정보 조회
export const useVendor = (vendorSeq?: number) => {
  return useQuery<IBaseResponse<IVendorInfo>>({
    queryKey: ['/api/b2b-service/vendor', { vendorSeq }],
    enabled: !!vendorSeq,
  });
};

// 벤더 솔루션 목록 조회
export const useVendorSolutions = (vendorSeq?: number) => {
  return useQuery<IBaseResponse<IVendorSolution[]>>({
    queryKey: ['/api/b2b-service/vendor/solution', { vendorSeq }],
    enabled: !!vendorSeq,
  });
};

// 벤더 솔루션 카테고리 조회
export const useVendorSolutionCategories = (vendorSeq?: number) => {
  return useQuery<IBaseResponse<IVendorSolutionCategory[]>>({
    queryKey: ['/api/b2b-service/vendor/category', { vendorSeq }],
    enabled: !!vendorSeq,
  });
};

// 이메일 중복 확인
export const useCheckEmailConflict = (email?: string, type?: 'vendor' | 'consumer') => {
  return useQuery<IBaseResponse<boolean>>({
    queryKey: ['/api/b2b-service/vendor/conflict', { email, type }],
    enabled: !!email && !!type,
  });
};
