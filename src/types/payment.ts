import { ISODateString } from './common';
import { Category } from './solution';

// ============ Union Types ============

export type PaymentStatus =
  | 'DONE'
  | 'CANCELED'
  | 'PARTIAL_CANCELED'
  | 'EXPIRED'
  | 'ABORTED'
  | 'WAITING_FOR_DEPOSIT'
  | 'SETTLED';

export const getPaymentStatusLabel = (status: PaymentStatus): string => {
  const labels: Record<PaymentStatus, string> = {
    DONE: '결제 완료',
    CANCELED: '취소됨',
    PARTIAL_CANCELED: '부분 취소',
    EXPIRED: '만료됨',
    ABORTED: '중단됨',
    WAITING_FOR_DEPOSIT: '입금 대기',
    SETTLED: '정산 완료',
  };
  return labels[status] ?? status;
};

export type PaymentMethod = 'CARD' | 'VIRTUAL_ACCOUNT' | 'EASY_PAY';

export const getPaymentMethodLabel = (method: PaymentMethod): string => {
  const labels: Record<PaymentMethod, string> = {
    CARD: '카드',
    VIRTUAL_ACCOUNT: '가상계좌',
    EASY_PAY: '간편결제',
  };
  return labels[method] ?? method;
};

// ============ Request Types ============

export interface ISavePaymentEventRequest extends Record<string, unknown> {
  consumerSeq: number;
  vendorSeq: number;
  category: string;
  paymentEventName: string;
  paymentEventUniqueType: string;
}

export interface ITossPaymentApprovalRequest extends Record<string, unknown> {
  paymentEventSeq: number;
  paymentKey: string;
  orderId: string;
  amount: number;
}

export interface IRefundRequest extends Record<string, unknown> {
  orderId: string;
  cancelReason: string;
  bankCode: string;
  accountNumber: string;
  holderName: string;
}

// ============ Response Types ============

export interface ISavePaymentEventResponse {
  paymentEventSeq: number;
  paymentEventUniqueType: string;
}

export interface IPaymentEventOrder {
  paymentEventSeq: number;
  paymentEventName: string;
  category: Category;
  vendorName: string;
  profileImage: string;
  representImageUrl: string;
  amount: number;
  tax: number;
  actualAmount: number;
  consumerSeq: number;
  consumerName: string;
  phoneNumber: string;
  email: string;
}

export interface IRequestedPaymentEvent {
  paymentEventSeq: number;
  paymentEventName: string;
  category: Category;
  amount: number;
  contractConfirmationUrl: string;
  refundPolicyUrl: string;
  createdAt: ISODateString;
  deleted: boolean;
}

export interface IConfirmedPaymentEvent {
  paymentEventSeq: number;
  paymentEventName: string;
  orderId: string;
  category: Category;
  amount: number;
  createdAt: ISODateString;
  refundDueDate: ISODateString;
}

// Toss 결제 응답
export interface ITossCardPaymentResponse {
  orderId: string;
  orderName: string;
  paymentKey: string;
  method: string;
  totalAmount: number;
  approvedAt: ISODateString;
  cardCompany: string;
  cardNumber: string;
  cardType: string;
  receiptUrl: string;
  category: Category;
}

export interface ITossVirtualAccountResponse {
  orderId: string;
  orderName: string;
  paymentKey: string;
  method: string;
  totalAmount: number;
  requestedAt: ISODateString;
  virtualAccountNumber: string;
  bankCode: string;
  customerName: string;
  dueDate: ISODateString;
  cashReceiptUrl: string;
  secret: string;
  receiptUrl: string;
  category: Category;
}

export interface ITossEasyPayResponse {
  orderId: string;
  orderName: string;
  paymentKey: string;
  method: string;
  totalAmount: number;
  approvedAt: ISODateString;
  receiptUrl: string;
  category: Category;
}
