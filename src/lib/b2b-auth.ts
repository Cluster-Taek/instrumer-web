import { fetchApi } from './base';
import { useMutation } from '@tanstack/react-query';
import { IBaseResponse } from '@/types/api';
import {
  ILoginVendorRequest,
  ILoginVendorResponse,
  ILoginConsumerRequest,
  ILoginConsumerResponse,
  ISaveVendorRequest,
  ISaveConsumerRequest,
  ISendMailRequest,
  IVerifyCodeRequest,
  IResetPasswordRequest,
  IResetLinkRequest,
  IResetLinkResponse,
} from '@/types/auth';

// 벤더 로그인
export const useLoginVendorMutation = () => {
  return useMutation({
    mutationFn: async (data: ILoginVendorRequest) =>
      await fetchApi.post<IBaseResponse<ILoginVendorResponse>>('/api/b2b-service/vendor/login', data),
  });
};

// 수요기업 로그인
export const useLoginConsumerMutation = () => {
  return useMutation({
    mutationFn: async (data: ILoginConsumerRequest) =>
      await fetchApi.post<IBaseResponse<ILoginConsumerResponse>>('/api/b2b-service/consumer/login', data),
  });
};

// 벤더 회원가입
export const useRegisterVendorMutation = () => {
  return useMutation({
    mutationFn: async (data: ISaveVendorRequest) =>
      await fetchApi.post<IBaseResponse<string>>('/api/b2b-service/vendor/join', data),
  });
};

// 수요기업 회원가입
export const useRegisterConsumerMutation = () => {
  return useMutation({
    mutationFn: async (data: ISaveConsumerRequest) =>
      await fetchApi.post<IBaseResponse<string>>('/api/b2b-service/consumer/join', data),
  });
};

// 벤더 이메일 인증 전송
export const useSendVendorMailMutation = () => {
  return useMutation({
    mutationFn: async (data: ISendMailRequest) =>
      await fetchApi.post<IBaseResponse<string>>('/api/b2b-service/vendor/email/send', data),
  });
};

// 수요기업 이메일 인증 전송
export const useSendConsumerMailMutation = () => {
  return useMutation({
    mutationFn: async (data: ISendMailRequest) =>
      await fetchApi.post<IBaseResponse<string>>('/api/b2b-service/consumer/email/send', data),
  });
};

// 벤더 이메일 인증 확인
export const useVerifyVendorCodeMutation = () => {
  return useMutation({
    mutationFn: async (data: IVerifyCodeRequest) =>
      await fetchApi.post<IBaseResponse<string>>('/api/b2b-service/vendor/email/verify', data),
  });
};

// 수요기업 이메일 인증 확인
export const useVerifyConsumerCodeMutation = () => {
  return useMutation({
    mutationFn: async (data: IVerifyCodeRequest) =>
      await fetchApi.post<IBaseResponse<string>>('/api/b2b-service/consumer/email/verify', data),
  });
};

// 벤더 비밀번호 재설정 링크 요청
export const useVendorResetLinkMutation = () => {
  return useMutation({
    mutationFn: async (data: IResetLinkRequest) =>
      await fetchApi.post<IBaseResponse<IResetLinkResponse>>('/api/b2b-service/vendor/resetLink', data),
  });
};

// 수요기업 비밀번호 재설정 링크 요청
export const useConsumerResetLinkMutation = () => {
  return useMutation({
    mutationFn: async (data: IResetLinkRequest) =>
      await fetchApi.post<IBaseResponse<IResetLinkResponse>>('/api/b2b-service/consumer/resetLink', data),
  });
};

// 벤더 비밀번호 재설정
export const useResetPasswordVendorMutation = () => {
  return useMutation({
    mutationFn: async (data: IResetPasswordRequest) =>
      await fetchApi.patch<IBaseResponse<string>>('/api/b2b-service/vendor/resetPassword', data),
  });
};

// 수요기업 비밀번호 재설정
export const useResetPasswordConsumerMutation = () => {
  return useMutation({
    mutationFn: async (data: IResetPasswordRequest) =>
      await fetchApi.patch<IBaseResponse<string>>('/api/b2b-service/consumer/resetPassword', data),
  });
};
