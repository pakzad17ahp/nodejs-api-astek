import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../modules/user/user.repository';
import { ApiError } from '../utils/api-error';

interface JwtPayload {
  id: string;
  username: string;
  is_super_admin: boolean;
  role: any;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = (fetchFromDB: boolean = false) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token)
      return next(new ApiError('Unauthorized : Token not entered', 401));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      if (fetchFromDB) {
        const user = await UserRepository.findOne({
          where: { id: decoded.id },
          relations: ['role'],
        });

        if (!user)
          return next(new ApiError('Unauthorized : User not found', 401));

        req.user = {
          id: user.id,
          username: user.username,
          is_super_admin: user.is_super_admin,
          role: user.role,
        };
      } else {
        req.user = decoded;
      }

      next();
    } catch (err: any) {
      if (err.name === 'JsonWebTokenError')
        return next(new ApiError('Invalid token', 401));
      if (err.name === 'TokenExpiredError')
        return next(new ApiError('Token expired', 401));

      return next(new ApiError('Forbidden : ' + err, 403));
    }
  };
};
