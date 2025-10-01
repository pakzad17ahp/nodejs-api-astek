import { AppDataSource } from "../../config/data-source";
import { User } from "./user.model";

export const UserRepository = AppDataSource.getRepository(User);
