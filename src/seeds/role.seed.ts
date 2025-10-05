import { AppDataSource } from '../config/data-source';
import { Role } from '../modules/role/role.model';

export const seedRoles = async () => {
  const repo = AppDataSource.getRepository(Role);

  const exists = await repo.findOne({ where: { name: 'Admin' } });
  if (exists) {
    console.log("Role 'Admin' already exists");
    return;
  }

  const role = repo.create({
    name: 'Admin',
    account: { create: true, update: true, view: true, Assign: true },
    product: { create: true, update: true, view: true },
    role: { create: true, update: true, view: true },
  });

  await repo.save(role);
  console.log("Role 'Admin' created");
};
