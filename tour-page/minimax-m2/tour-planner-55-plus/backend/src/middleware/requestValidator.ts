import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { createError } from './errorHandler';

export const requestValidator = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      if (!result.success) {
        const message = result.error.errors
          .map((err) => `${err.path.join('.')}: ${err.message}`)
          .join(', ');

        return next(createError(`Validation error: ${message}`, 400));
      }

      Object.assign(req, result.data);
      next();
    } catch (error) {
      next(error);
    }
  };
};
