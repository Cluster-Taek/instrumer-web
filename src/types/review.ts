import { ISODateString } from './common';

export interface ISolutionReview {
  consumerSeq: number;
  consumerName: string;
  consumerImageUrl: string;
  star: number;
  comment: string;
  createdAt: ISODateString;
}

export interface ISaveReviewRequest extends Record<string, unknown> {
  solutionSeq: number;
  consumerSeq: number;
  comment: string;
  star: number;
}

export interface IModifyReviewRequest extends Record<string, unknown> {
  solutionReviewSeq: number;
  comment: string;
  star: number;
}

export interface ISaveReviewResponse {
  solutionReviewSeq: number;
}
