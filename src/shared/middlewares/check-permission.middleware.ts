import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/api-error';

export enum section {
  account = 'account',
  product = 'product',
  role = 'role',
}

export enum action {
  create = 'create',
  update = 'update',
  view = 'view',
}

export const checkPermission = (section: section, action: action) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user)
      return next(new ApiError('Unauthorized: user not logged in', 401));

    const role = user.role;
    if (!role || !role[section] || !role[section][action]) {
      return next(
        new ApiError(
          `Forbidden: you do not have permission to ${action} in ${section}`,
          403,
        ),
      );
    }

    next();
  };
};
