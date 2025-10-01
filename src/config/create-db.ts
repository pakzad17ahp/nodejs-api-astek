import "reflect-metadata";
import { DataSource } from "typeorm";

export const createDatabaseIfNotExists = async (): Promise<void> => {
  const dbHost = process.env.DB_HOST || "localhost";
  const dbPort = Number(process.env.DB_PORT) || 5432;
  const dbUsername = process.env.DB_USER || "postgres";
  const dbPassword = process.env.DB_PASSWORD || "postgres";
  const dbName = process.env.DB_NAME || "astekdb";

  const tempDataSource = new DataSource({
    type: "postgres",
    host: dbHost,
    port: dbPort,
    username: dbUsername,
    password: dbPassword,
    database: "postgres",
    synchronize: false,
    logging: false,
  });

  try {
    await tempDataSource.initialize();

    const result = await tempDataSource.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (!result.length) {
      console.log(`Database "${dbName}" does not exist. Creating...`);
      await tempDataSource.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database "${dbName}" created successfully!`);
    } else {
      console.log(`Database "${dbName}" already exists.`);
    }

    await tempDataSource.destroy();
  } catch (error) {
    console.error("Error checking/creating database:", error);
    process.exit(1);
  }
};
