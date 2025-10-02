import { Request, Response } from "express";
import { RoleService } from "./role.service";
import { Role } from "./role.model";

export class RoleController {
  roleService = new RoleService();

  async getAll(req: Request, res: Response): Promise<void> {
    const roles = await this.roleService.getAll();
    res.status(200).json(roles);
  }

  async getById(req: Request, res: Response) {
    const role = await this.roleService.getById(req.params.id);
    if (!role) return res.status(404).json({ message: "Role_not_found" });
    res.status(200).json(role);
  }

  async create(req: Request, res: Response): Promise<void> {
    const roles = await this.roleService.create(req.body);
    res.status(201).json(roles);
  }

  async update(req: Request, res: Response) {
    const role = await this.roleService.update(req.params.id, req.body);
    if (!role) return res.status(404).json({ message: "Role_not_found" });
    res.status(201).json(role);
  }
}
