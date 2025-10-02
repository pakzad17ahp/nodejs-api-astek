import { Request, Response, NextFunction } from "express";

export enum section {
  account = "account",
  product = "product",
  role = "role",
}

export enum action {
  create = "create",
  update = "update",
  view = "view",
}

export const checkPermission = (section: section, action: action) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const role = user.role;
    if (!role || !role[section] || !role[section][action]) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};
