import { NextFunction, Request, Response } from 'express';
import { RoleService } from './role.service';
import { Role } from './role.model';
import { ApiError } from '../../shared/utils/api-error';
import { sendSuccess } from '../../shared/utils/response';

export class RoleController {
  roleService = new RoleService();

  async getAll(req: Request, res: Response): Promise<void> {
    const roles = await this.roleService.getAll();
    sendSuccess(res, roles);
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const role = await this.roleService.getById(req.params.id);
      if (!role) next(new ApiError('Role not found', 404));
      sendSuccess(res, role);
    } catch (err: any) {
      next(new ApiError(err));
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const role = await this.roleService.create(req.body);
      sendSuccess(res, role, 'Role created successfully', 201);
    } catch (err: any) {
      next(new ApiError(err));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const role = await this.roleService.update(req.params.id, req.body);
      if (!role) next(new ApiError('Role not found', 404));
      sendSuccess(res, role, 'Role updated successfully', 201);
    } catch (err: any) {
      next(new ApiError(err));
    }
  }
}
