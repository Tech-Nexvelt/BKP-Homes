import bcrypt from 'bcryptjs';
import { prisma } from '../../config/database';
import { env } from '../../config/env';
import {
  generateAccessToken,
  generateRefreshToken,
  generateOTP,
  hashToken,
  getRefreshTokenExpiry,
  getOTPExpiry,
  verifyRefreshToken,
} from '../../utils/token.utils';
import { sendOTPEmail, sendPasswordResetEmail, sendWelcomeEmail } from '../../utils/mailer.utils';
import { HttpError } from '../../middleware/error.middleware';
import type {
  RegisterInput,
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  VerifyOTPInput,
  ResendOTPInput,
} from './auth.validator';

export class AuthService {
  async register(data: RegisterInput) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      throw new HttpError('An account with this email already exists', 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, env.BCRYPT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
      },
      select: { id: true, name: true, email: true, role: true, isVerified: true },
    });

    const otp = generateOTP();
    const expiresAt = getOTPExpiry(10);

    await prisma.oTPVerification.create({
      data: {
        userId: user.id,
        otp,
        type: 'EMAIL_VERIFICATION',
        expiresAt,
      },
    });

    await sendOTPEmail(user.email, otp, user.name);
    await sendWelcomeEmail(user.email, user.name);

    return { userId: user.id, message: 'OTP sent to your email for verification' };
  }

  async login(data: LoginInput) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      throw new HttpError('Invalid email or password', 401);
    }

    if (!user.isActive) {
      throw new HttpError('Your account has been deactivated. Please contact support.', 403);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new HttpError('Invalid email or password', 401);
    }

    const tokenPayload = { userId: user.id, role: user.role };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);
    const hashedRefreshToken = hashToken(refreshToken);

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: hashedRefreshToken,
        expiresAt: getRefreshTokenExpiry(),
      },
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        avatar: user.avatar,
      },
    };
  }

  async refresh(refreshToken: string) {
    let payload: { userId: string; role: string };
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new HttpError('Invalid or expired refresh token', 401);
    }

    const hashedToken = hashToken(refreshToken);
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: hashedToken },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      throw new HttpError('Refresh token expired or invalid', 401);
    }

    // Rotate token
    await prisma.refreshToken.delete({ where: { id: storedToken.id } });

    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);
    const hashedNewToken = hashToken(newRefreshToken);

    await prisma.refreshToken.create({
      data: {
        userId: payload.userId,
        token: hashedNewToken,
        expiresAt: getRefreshTokenExpiry(),
      },
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async logout(refreshToken: string): Promise<void> {
    const hashedToken = hashToken(refreshToken);
    await prisma.refreshToken.deleteMany({ where: { token: hashedToken } });
  }

  async forgotPassword(data: ForgotPasswordInput) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    // Always return success to prevent email enumeration
    if (!user) return { message: 'If this email exists, a reset link has been sent.' };

    const otp = generateOTP();
    const expiresAt = getOTPExpiry(10);

    await prisma.oTPVerification.create({
      data: {
        userId: user.id,
        otp,
        type: 'PASSWORD_RESET',
        expiresAt,
      },
    });

    const resetLink = `${env.FRONTEND_URL}/auth/reset-password?userId=${user.id}&otp=${otp}`;
    await sendPasswordResetEmail(user.email, user.name, resetLink);

    return { message: 'If this email exists, a reset link has been sent.' };
  }

  async resetPassword(data: ResetPasswordInput) {
    // Find valid OTP
    const otpRecord = await prisma.oTPVerification.findFirst({
      where: {
        otp: data.token,
        type: 'PASSWORD_RESET',
        used: false,
        expiresAt: { gt: new Date() },
      },
    });

    if (!otpRecord) {
      throw new HttpError('Invalid or expired reset token', 400);
    }

    const hashedPassword = await bcrypt.hash(data.password, env.BCRYPT_ROUNDS);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: otpRecord.userId },
        data: { password: hashedPassword },
      }),
      prisma.oTPVerification.update({
        where: { id: otpRecord.id },
        data: { used: true },
      }),
      prisma.refreshToken.deleteMany({ where: { userId: otpRecord.userId } }),
    ]);

    return { message: 'Password reset successfully. Please login.' };
  }

  async verifyOTP(data: VerifyOTPInput) {
    const otpRecord = await prisma.oTPVerification.findFirst({
      where: {
        userId: data.userId,
        otp: data.otp,
        type: data.type,
        used: false,
        expiresAt: { gt: new Date() },
      },
    });

    if (!otpRecord) {
      throw new HttpError('Invalid or expired OTP', 400);
    }

    await prisma.oTPVerification.update({
      where: { id: otpRecord.id },
      data: { used: true },
    });

    if (data.type === 'EMAIL_VERIFICATION') {
      await prisma.user.update({
        where: { id: data.userId },
        data: { isVerified: true },
      });
    }

    return { message: 'Verified successfully' };
  }

  async resendOTP(data: ResendOTPInput) {
    const user = await prisma.user.findUnique({ where: { id: data.userId } });
    if (!user) throw new HttpError('User not found', 404);

    const otp = generateOTP();
    const expiresAt = getOTPExpiry(10);

    await prisma.oTPVerification.create({
      data: {
        userId: user.id,
        otp,
        type: data.type,
        expiresAt,
      },
    });

    await sendOTPEmail(user.email, otp, user.name);
    return { message: 'OTP resent successfully' };
  }
}

export const authService = new AuthService();
