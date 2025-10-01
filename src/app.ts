import express from "express";
import routes from "./routes";
import { AppDataSource } from "./config/data-source";
import { createDatabaseIfNotExists } from "./config/create-db";

const app = express();

app.use(express.json());
app.use("/api", routes);

const init = async () => {
  await createDatabaseIfNotExists();

  await AppDataSource.initialize();
  console.log("Data Source has been initialized!");
};

init().catch((err) => {
  console.error("Error initializing app:", err);
});

export default app;
