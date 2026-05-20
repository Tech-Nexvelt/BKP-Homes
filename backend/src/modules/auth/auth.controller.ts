import { Request, Response } from 'express';
import { authService } from './auth.service';
import { sendSuccess, sendCreated } from '../../utils/response.utils';
import type {
  RegisterInput,
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  VerifyOTPInput,
  ResendOTPInput,
} from './auth.validator';

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    const data = req.body as RegisterInput;
    const result = await authService.register(data);
    sendCreated(res, result, 'Registration successful. Please verify your email.');
  }

  async login(req: Request, res: Response): Promise<void> {
    const data = req.body as LoginInput;
    const result = await authService.login(data);
    sendSuccess(res, result, 'Login successful');
  }

  async refresh(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.body as { refreshToken: string };
    const result = await authService.refresh(refreshToken);
    sendSuccess(res, result, 'Tokens refreshed');
  }

  async logout(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.body as { refreshToken: string };
    await authService.logout(refreshToken);
    sendSuccess(res, null, 'Logged out successfully');
  }

  async forgotPassword(req: Request, res: Response): Promise<void> {
    const data = req.body as ForgotPasswordInput;
    const result = await authService.forgotPassword(data);
    sendSuccess(res, result, result.message);
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    const data = req.body as ResetPasswordInput;
    const result = await authService.resetPassword(data);
    sendSuccess(res, result, result.message);
  }

  async verifyOTP(req: Request, res: Response): Promise<void> {
    const data = req.body as VerifyOTPInput;
    const result = await authService.verifyOTP(data);
    sendSuccess(res, result, result.message);
  }

  async resendOTP(req: Request, res: Response): Promise<void> {
    const data = req.body as ResendOTPInput;
    const result = await authService.resendOTP(data);
    sendSuccess(res, result, result.message);
  }
}

export const authController = new AuthController();
