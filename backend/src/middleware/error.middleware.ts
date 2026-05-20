import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { env } from '../config/env';

export interface AppError extends Error {
  statusCode?: number;
  details?: unknown;
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const statusCode = err.statusCode ?? 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`[${statusCode}] ${message}`, {
    stack: err.stack,
    details: err.details,
  });

  res.status(statusCode).json({
    success: false,
    error: message,
    statusCode,
    ...(env.NODE_ENV !== 'production' && { stack: err.stack }),
    ...(err.details !== undefined && { details: err.details }),
  });
};

export const notFoundHandler = (_req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    statusCode: 404,
  });
};

export class HttpError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(message: string, statusCode: number, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = 'HttpError';
  }
}
