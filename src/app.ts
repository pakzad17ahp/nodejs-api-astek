import express from "express";
import routes from "./routes";
import { AppDataSource } from "./config/data-source";
import { createDatabaseIfNotExists } from "./config/create-db";
import { errorMiddleware } from "./shared/middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

const init = async () => {
  await createDatabaseIfNotExists();

  await AppDataSource.initialize();
  console.log("Data Source has been initialized!");
};

init().catch((err) => {
  console.error("Error initializing app:", err);
});

app.use(errorMiddleware);

export default app;
