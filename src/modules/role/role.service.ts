import { Role } from "./role.model";
import { RoleRepository } from "./role.repository";

export class RoleService {
  async getAll(): Promise<Role[]> {
    const roles = await RoleRepository.find();
    return roles;
  }

  async getById(id: string): Promise<Role | null> {
    const role = await RoleRepository.findOneBy({ id });
    return role;
  }

  async create(data: Partial<Role>): Promise<Role> {
    const role = await RoleRepository.create(data);
    return await RoleRepository.save(role);
  }

  async update(id: string, data: Partial<Role | null>) {
    const role = await RoleRepository.findOneBy({ id });
    if (!role) return null;
    Object.assign(role, data);
    return await RoleRepository.save(role);
  }
}
