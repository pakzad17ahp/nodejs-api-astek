import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/api-error';

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  if (err.code === '22P02') {
    return res.status(400).json({
      success: false,
      error: {
        code: err.code,
        message: 'Invalid input syntax for type (wrong data format).',
        details: err.detail || null,
      },
    });
  }

  if (err.code === '23505') {
    return res.status(400).json({
      success: false,
      error: {
        code: err.code,
        message: 'Duplicate value violates unique constraint.',
        details: err.detail || null,
      },
    });
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.statusCode.toString(),
        message: err.message,
        details: null,
      },
    });
  }

  res.status(500).json({
    success: false,
    error: {
      code: '500',
      message: 'Internal Server Error',
      details: null,
    },
  });
};
