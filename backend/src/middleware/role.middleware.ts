import { Request, Response, NextFunction } from 'express';
import { sendForbidden } from '../utils/response.utils';

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    sendForbidden(res, 'Authentication required');
    return;
  }
  if (req.user.role !== 'ADMIN') {
    sendForbidden(res, 'Admin access required');
    return;
  }
  next();
};

export const isEmployee = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    sendForbidden(res, 'Authentication required');
    return;
  }
  if (req.user.role !== 'ADMIN' && req.user.role !== 'EMPLOYEE') {
    sendForbidden(res, 'Employee or admin access required');
    return;
  }
  next();
};
