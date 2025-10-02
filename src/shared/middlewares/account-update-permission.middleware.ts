import { Request, Response, NextFunction } from "express";

export const accountUpdatePermission = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.is_super_admin && req.body.is_super_admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!req.user.role.account.Assign && req.body.role)
    return res.status(401).json({ message: "Unauthorized" });

  next();
};
