import { ISODateString } from './common';
import { Category } from './solution';
import { PaymentStatus, PaymentMethod } from './payment';

// ============ Interfaces ============

export interface IStatData {
  label: string;
  percentage: number;
}

export interface IVendorStat {
  salesSize: IStatData[];
  employeesSize: IStatData[];
}

export interface IVendorDashboard {
  vendorSeq: number;
  CONFIRMED: number;
  DONE: number;
  SETTLED: number;
}

export interface IVendorDashboardDoneItem {
  vendorSeq: number;
  paymentStatus: PaymentStatus;
  solutionSeq: number;
  solutionName: string;
  solutionAmount: number;
  settlementDueDate: ISODateString;
  settlementAmount: number;
  consumerSeq: number;
  consumerName: string;
}

export interface IVendorDashboardSettledItem {
  vendorSeq: number;
  paymentStatus: PaymentStatus;
  solutionSeq: number;
  solutionName: string;
  solutionAmount: number;
  settlementDueDate: ISODateString;
  settlementAmount: number;
  consumerSeq: number;
  consumerName: string;
}

export interface IConsumerDashboardItem {
  consumerSeq: number;
  vendorSeq: number;
  paymentStatus: PaymentStatus;
  paymentCompletedAt: ISODateString;
  representImageUrl: string;
  vendorName: string;
  vendorUniqueType: string;
  solutionSeq: number;
  solutionName: string;
  method: PaymentMethod;
  amount: number;
  existReview: boolean;
  category: Category;
}
