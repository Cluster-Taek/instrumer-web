// API 기본 응답
export interface IBaseResponse<T> {
  status: number;
  message: string;
  data: T;
}

// 에러 응답
export interface IErrorResponse {
  httpStatus: string;
  message: string;
  code: string;
}

// 시간 타입
export interface ILocalTime {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}
