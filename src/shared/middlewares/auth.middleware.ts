import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../modules/user/user.repository";

interface JwtPayload {
  id: string;
  username: string;
  role: string;
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
      }

      (req as any).user = decoded;

      next();
    } catch (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
  };
};
