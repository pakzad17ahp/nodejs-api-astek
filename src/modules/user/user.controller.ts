import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  constructor(private readonly userService = new UserService()) {}

  async getAll(req: Request, res: Response) {
    const users = await this.userService.getAll();
    res.json(users);
  }

  async getById(req: Request, res: Response) {
    const user = await this.userService.getById(req.params.id);
    if (!user) res.status(404).json({ message: "User_not_found" });
    res.json(user);
  }

  async create(req: Request, res: Response) {
    const user = await this.userService.create(req.body);
    res.status(201).json(user);
  }

  async update(req: Request, res: Response) {
    const user = await this.userService.update(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: "User_not_found" });
    res.json(user);
  }
}
