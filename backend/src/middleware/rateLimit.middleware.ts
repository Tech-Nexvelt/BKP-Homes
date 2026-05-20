import rateLimit from 'express-rate-limit';
import { env } from '../config/env';
import { sendError } from '../utils/response.utils';
import { Request, Response } from 'express';

export const generalLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req: Request, res: Response) => {
    sendError(res, 'Too many requests, please try again later.', 429);
  },
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req: Request, res: Response) => {
    sendError(res, 'Too many authentication attempts, please wait 15 minutes.', 429);
  },
});

export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req: Request, res: Response) => {
    sendError(res, 'Upload limit reached, please try again later.', 429);
  },
});
