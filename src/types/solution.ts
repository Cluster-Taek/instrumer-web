// ============ Union Types ============

export type Budget =
  | '전체'
  | '500,000원 미만'
  | '500,000원~1,000,000원 미만'
  | '1,000,000원~3,000,000원 미만'
  | '3,000,000원~5,000,000원 미만'
  | '5,000,000원~10,000,000원 미만'
  | '10,000,000원 이상';

export type Category =
  | 'ADVERTISING_AUTOMATION'
  | 'MARKETING_ANALYSIS_AUTOMATION'
  | 'INFLUENCER_CREATOR_COLLABORATION'
  | 'CRM'
  | 'CUSTOMER_SERVICE'
  | 'ACCOUNTING_FINANCE'
  | 'INVENTORY_LOGISTICS'
  | 'PAYMENT_SUBSCRIPTION'
  | 'CONTENT_CREATION_DESIGN';

export type FilterKey = 'category' | 'budget';

export interface IFilterConfig {
  paramName: string;
  multiple: boolean;
  defaultValue?: string;
}

export type Direction = 'INCREASE' | 'DECREASE';

export const getDirectionLabel = (direction: Direction): string => {
  return direction === 'INCREASE' ? '증가' : '감소';
};

// ============ Interfaces ============

export interface ISolutionEffect {
  effectName: string;
  percent: number;
  direction: Direction;
}

export interface ISolution {
  solutionSeq: number;
  representImageUrl: string;
  descriptionPdfUrl: string;
  solutionName: string;
  solutionDetail: string;
  amount: number;
  solutionImplementationType: string[];
  duration: number;
  recommendedCompanySize: string[];
  solutionEffect: ISolutionEffect[];
  keywords: string[];
}

export interface ISolutionListItem {
  solutionSeq: number;
  solutionName: string;
  amount: number;
  representImageUrl: string;
  category: Category;
  vendorSeq: number;
  vendorName: string;
  averageStar: number;
  countSolutionReview: number;
}

// ============ Request Types ============

export interface ISaveSolutionRequest {
  vendorSeq: number;
  solutionName: string;
  solutionDetail: string;
  category: string;
  recommendedCompanySize: string;
  solutionImplementationType: string;
  amount: number;
  duration: number;
  solutionEffect: ISolutionEffect[];
  keyword: string[];
}

export interface IModifySolutionRequest extends ISaveSolutionRequest {
  solutionSeq: number;
}

// ============ Response Types ============

export interface ISaveSolutionResponse {
  solutionSeq: number;
}
