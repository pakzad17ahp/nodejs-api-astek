import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import { AppDataSource } from '../config/data-source';
import { seedRegistry } from './seed.config';

const runSeed = async () => {
  const arg = process.argv[2] || 'all';

  if (!seedRegistry[arg as keyof typeof seedRegistry]) {
    console.error(`Seeder "${arg}" not found!`);
    console.log('Available:', Object.keys(seedRegistry).join(', '));
    process.exit(1);
  }

  await AppDataSource.initialize();
  console.log('Database connected');

  await seedRegistry[arg as keyof typeof seedRegistry]();
  console.log(`Seeder "${arg}" completed`);

  await AppDataSource.destroy();
  process.exit(0);
};

runSeed().catch((err) => {
  console.error('Error running seed:', err);
  process.exit(1);
});
