import { UserType } from './auth';

// ============ Request Types ============

// 벤더 정보 수정 요청
export interface IUpdateVendorRequest extends Record<string, unknown> {
  businessName?: string;
  phone?: string;
  email?: string;
  password?: string;
  bank?: string;
  account?: string;
  profileImageUrl?: string;
}

// ============ Response Types ============

// 벤더 정보 조회 응답
export interface IGetVendorResponse {
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
