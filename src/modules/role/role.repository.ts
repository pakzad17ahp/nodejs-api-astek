import { AppDataSource } from "../../config/data-source";
import { Role } from "./role.model";

export const RoleRepository = AppDataSource.getRepository(Role);
