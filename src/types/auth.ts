// ============ Request Types ============

export interface ILoginVendorRequest extends Record<string, unknown> {
  email: string;
  password: string;
}

export interface ILoginConsumerRequest extends Record<string, unknown> {
  email: string;
  password: string;
}

export interface ISaveVendorRequest extends Record<string, unknown> {
  vendorName: string;
  managerName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ISaveConsumerRequest extends Record<string, unknown> {
  consumerName: string;
  phoneNum: string;
  email: string;
  password: string;
  confirmPassword: string;
  industry: string;
}

export interface ISendMailRequest extends Record<string, unknown> {
  email: string;
}

export interface IVerifyCodeRequest extends Record<string, unknown> {
  code: string;
  email: string;
}

export interface IResetPasswordRequest extends Record<string, unknown> {
  newPassword: string;
  confirmPassword: string;
}

export interface IResetLinkRequest extends Record<string, unknown> {
  email: string;
  vendorName: string;
}

// ============ Response Types ============

export interface ILoginVendorResponse {
  accessToken: string;
  refreshToken: string;
  vendorSeq: number;
  vendorUniqueType: string;
  vendorName: string;
}

export interface ILoginConsumerResponse {
  accessToken: string;
  refreshToken: string;
  consumerSeq: number;
  consumerUniqueType: string;
  consumerName: string;
}

export interface IResetLinkResponse {
  token: string;
  link: string;
  consumerSeq: number;
}
