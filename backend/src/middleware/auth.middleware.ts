import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/token.utils';
import { sendUnauthorized } from '../utils/response.utils';

export const isAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.substring(7)
    : null;

  if (!token) {
    sendUnauthorized(res, 'Access token required');
    return;
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = { userId: payload.userId, role: payload.role };
    next();
  } catch {
    sendUnauthorized(res, 'Invalid or expired access token');
  }
};

export const optionalAuth = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.substring(7)
    : null;

  if (token) {
    try {
      const payload = verifyAccessToken(token);
      req.user = { userId: payload.userId, role: payload.role };
    } catch {
      // Silently ignore invalid token for optional auth
    }
  }
  next();
};
