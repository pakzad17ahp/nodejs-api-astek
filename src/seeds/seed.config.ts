import { seedUsers } from './user.seed';
import { seedRoles } from './role.seed';

export const seedRegistry = {
  user: seedUsers,
  role: seedRoles,
  all: async () => {
    await seedRoles();
    await seedUsers();
  },
};
