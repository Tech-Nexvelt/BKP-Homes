import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { jwtConfig } from '../config/jwt.config';

export interface JwtPayload {
  userId: string;
  role: string;
  iat?: number;
  exp?: number;
}

export const generateAccessToken = (payload: Omit<JwtPayload, 'iat' | 'exp'>): string => {
  return jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  } as jwt.SignOptions);
};

export const generateRefreshToken = (payload: Omit<JwtPayload, 'iat' | 'exp'>): string => {
  return jwt.sign(payload, jwtConfig.refreshSecret, {
    expiresIn: jwtConfig.refreshExpiresIn,
  } as jwt.SignOptions);
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, jwtConfig.secret) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, jwtConfig.refreshSecret) as JwtPayload;
};

export const generateOTP = (length = 6): string => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};

export const hashToken = (token: string): string => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

export const getRefreshTokenExpiry = (): Date => {
  return new Date(Date.now() + jwtConfig.refreshExpiresInMs);
};

export const getOTPExpiry = (minutes = 10): Date => {
  return new Date(Date.now() + minutes * 60 * 1000);
};
