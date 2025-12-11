import { ILocalTime } from './api';
import { Category } from './solution';

// ============ Interfaces ============

export type StatType = 'SALES_SIZE' | 'EMPLOYEES_SIZE';

export const getStatTypeLabel = (type: StatType): string => {
  return type === 'SALES_SIZE' ? '매출 규모' : '직원 수';
};

export interface IStatResponse {
  statType: StatType;
  percentage: number;
  label: string;
}

export interface IClientResponse {
  clientSeq: number;
  logoImageUrl: string;
}

export interface IVendorInfo {
  vendorSeq: number;
  vendorName: string;
  managerName: string;
  phoneNumber: string;
  email: string;
  audit: boolean;
  accountNumber: string;
  bank: string;
  vendorExplanation: string;
  vendorBannerImageUrl: string;
  weekdayAvailable: boolean;
  weekdayStartTime: ILocalTime;
  weekdayEndTime: ILocalTime;
  weekendAvailable: boolean;
  weekendStartTime: ILocalTime;
  weekendEndTime: ILocalTime;
  holidayAvailable: boolean;
  holidayStartTime: ILocalTime;
  holidayEndTime: ILocalTime;
  orderCount: number;
  clientCount: number;
  vendorUniqueType: string;
  profileImage: string;
  stats: IStatResponse[];
  clientResponses: IClientResponse[];
}

export interface IVendorSolution {
  solutionSeq: number;
  solutionName: string;
  category: Category;
  amount: number;
}

export interface IVendorSolutionCategory {
  category: Category;
  solutionSeq: number;
}
