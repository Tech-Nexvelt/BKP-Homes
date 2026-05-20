import { Router } from 'express';
import { authController } from './auth.controller';
import { validate } from '../../middleware/validate.middleware';
import { authLimiter } from '../../middleware/rateLimit.middleware';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyOTPSchema,
  resendOTPSchema,
  refreshTokenSchema,
} from './auth.validator';

const router = Router();

router.post('/register', authLimiter, validate(registerSchema), (req, res) =>
  authController.register(req, res),
);
router.post('/login', authLimiter, validate(loginSchema), (req, res) =>
  authController.login(req, res),
);
router.post('/logout', validate(refreshTokenSchema), (req, res) =>
  authController.logout(req, res),
);
router.post('/refresh', validate(refreshTokenSchema), (req, res) =>
  authController.refresh(req, res),
);
router.post('/forgot-password', authLimiter, validate(forgotPasswordSchema), (req, res) =>
  authController.forgotPassword(req, res),
);
router.post('/reset-password', authLimiter, validate(resetPasswordSchema), (req, res) =>
  authController.resetPassword(req, res),
);
router.post('/verify-otp', validate(verifyOTPSchema), (req, res) =>
  authController.verifyOTP(req, res),
);
router.post('/resend-otp', authLimiter, validate(resendOTPSchema), (req, res) =>
  authController.resendOTP(req, res),
);

export default router;
