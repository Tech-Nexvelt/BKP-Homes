import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { sendBadRequest } from '../utils/response.utils';

export const validate =
  (schema: ZodSchema, source: 'body' | 'query' | 'params' = 'body') =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      const details = (result.error as ZodError).flatten().fieldErrors;
      sendBadRequest(res, 'Validation failed', details);
      return;
    }
    req[source] = result.data;
    next();
  };
