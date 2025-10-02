import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/api-error';

export const accountUpdatePermission = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user.is_super_admin && req.body.is_super_admin) {
    next(new ApiError('Unauthorized : User does not require permission', 401));
  }

  if (!req.user.role.account.Assign && req.body.role)
    next(new ApiError('Unauthorized : User does not require permission', 401));

  next();
};
