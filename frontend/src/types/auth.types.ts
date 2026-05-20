export type Role = 'CUSTOMER' | 'ADMIN' | 'EMPLOYEE';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  avatar?: string;
  isVerified: boolean;
  isActive: boolean;
  dob?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

export interface OtpPayload {
  email: string;
  otp: string;
  type: 'EMAIL_VERIFY' | 'PASSWORD_RESET';
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}
