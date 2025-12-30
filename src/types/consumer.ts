import { UserType } from './auth';

// ============ Request Types ============

// 수요기업 정보 수정 요청
export interface IUpdateConsumerRequest extends Record<string, unknown> {
  businessName?: string;
  email?: string;
  phone?: string;
  password?: string;
  profileImageUrl?: string;
}

// ============ Response Types ============

// 수요기업 정보 조회 응답
export interface IGetConsumerResponse {
  userSeq: number;
  email: string;
  userType: UserType;
  profileImageUrl?: string;
  businessName: string;
  managerName: string;
  phone: string;
}
