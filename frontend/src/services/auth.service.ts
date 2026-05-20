import api from '@/lib/axios';
import type { LoginPayload, SignupPayload, AuthTokens, OtpPayload } from '@/types/auth.types';
import type { ApiResponse } from '@/types/api.types';

export const authService = {
  login: (data: LoginPayload) =>
    api.post<ApiResponse<AuthTokens>>('/auth/login', data),

  signup: (data: SignupPayload) =>
    api.post<ApiResponse<{ message: string }>>('/auth/signup', data),

  verifyOtp: (data: OtpPayload) =>
    api.post<ApiResponse<AuthTokens>>('/auth/verify-otp', data),

  resendOtp: (email: string) =>
    api.post<ApiResponse<null>>('/auth/resend-otp', { email }),

  logout: () =>
    api.post<ApiResponse<null>>('/auth/logout'),

  refresh: () =>
    api.post<ApiResponse<{ accessToken: string }>>('/auth/refresh'),

  forgotPassword: (email: string) =>
    api.post<ApiResponse<null>>('/auth/forgot-password', { email }),

  resetPassword: (token: string, password: string) =>
    api.post<ApiResponse<null>>('/auth/reset-password', { token, password }),

  me: () =>
    api.get<ApiResponse<AuthTokens['user']>>('/auth/me'),
};
