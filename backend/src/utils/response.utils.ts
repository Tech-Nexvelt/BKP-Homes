import { Response } from 'express';

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message: string;
  pagination?: PaginationMeta;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  statusCode: number;
  details?: unknown;
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode = 200,
  pagination?: PaginationMeta,
): Response => {
  const response: ApiSuccessResponse<T> = {
    success: true,
    data,
    message,
    ...(pagination && { pagination }),
  };
  return res.status(statusCode).json(response);
};

export const sendCreated = <T>(
  res: Response,
  data: T,
  message = 'Created successfully',
): Response => {
  return sendSuccess(res, data, message, 201);
};

export const sendError = (
  res: Response,
  error: string,
  statusCode = 500,
  details?: unknown,
): Response => {
  const response: ApiErrorResponse = {
    success: false,
    error,
    statusCode,
    ...(details !== undefined && { details }),
  };
  return res.status(statusCode).json(response);
};

export const sendNotFound = (res: Response, message = 'Resource not found'): Response => {
  return sendError(res, message, 404);
};

export const sendUnauthorized = (res: Response, message = 'Unauthorized'): Response => {
  return sendError(res, message, 401);
};

export const sendForbidden = (res: Response, message = 'Forbidden'): Response => {
  return sendError(res, message, 403);
};

export const sendBadRequest = (res: Response, message: string, details?: unknown): Response => {
  return sendError(res, message, 400, details);
};
