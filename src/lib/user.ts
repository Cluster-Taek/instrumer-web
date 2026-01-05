import { IBaseResponse } from '@/types/api';
import { UserType } from '@/types/auth';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export interface IUserResponse {
  userSeq: number;
  email: string;
  userType: UserType;
  profileImageUrl?: string;
  businessName: string;
  managerName: string;
  phone: string;
  bank?: string;
  account?: string;
}

// 현재 로그인한 사용자 정보 조회
export const useUser = () => {
  const { data: session } = useSession();

  return useQuery<IBaseResponse<IUserResponse>>({
    queryKey: ['/api/users'],
    enabled: !!session?.user?.accessToken,
  });
};

// 현재 로그인한 사용자 정보 조회 (Suspense)
export const useSuspenseUserInfo = () => {
  return useSuspenseQuery<IBaseResponse<IUserResponse>>({
    queryKey: ['/api/users'],
  });
};
