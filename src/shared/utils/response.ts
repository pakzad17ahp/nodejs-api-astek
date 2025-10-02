import { Response } from 'express';

export const sendSuccess = (
  res: Response,
  data: any,
  message: string = 'OK',
  status: number = 200,
) => {
  return res.status(status).json({
    success: true,
    data,
    message,
  });
};
