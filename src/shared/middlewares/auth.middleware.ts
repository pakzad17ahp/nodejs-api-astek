import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../modules/user/user.repository";

interface JwtPayload {
  id: string;
  username: string;
  is_super_admin: boolean;
  role: string;
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
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      if (fetchFromDB) {
        const user = await UserRepository.findOne({
          where: { id: decoded.id },
          relations: ["role"],
        });

        if (!user) return res.status(401).json({ message: "Unauthorized" });
        req.user = {
          id: user.id,
          username: user.username,
          is_super_admin: user.is_super_admin,
          role: user.role,
        };
      } else req.user = decoded;

      next();
    } catch (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
  };
};
