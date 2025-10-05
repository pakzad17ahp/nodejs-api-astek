import { AppDataSource } from '../config/data-source';
import { Role } from '../modules/role/role.model';
import { User } from '../modules/user/user.model';
import bcrypt from 'bcrypt';

export const seedUsers = async () => {
  const userRepo = AppDataSource.getRepository(User);
  const RoleRepo = AppDataSource.getRepository(Role);

  const user = await userRepo.findOne({ where: { username: 'admin' } });
  if (user) {
    console.log("User 'Admin' already exists");
    return;
  }

  const role = await RoleRepo.findOne({ where: { name: 'Admin' } });
  if (!role) {
    console.log("Role 'Admin' dose not exists");
    return;
  }

  const password = await bcrypt.hash('admin', 10);

  const admin = userRepo.create({
    username: 'admin',
    name: 'Super Admin',
    phone: '9123456789',
    password,
    is_super_admin: true,
    role: role,
  });

  await userRepo.save(admin);
  console.log('Admin user created');
};
