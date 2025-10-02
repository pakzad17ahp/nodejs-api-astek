import { AppDataSource } from "../../config/data-source";
import { Product } from "./product.model";

export const ProductRepository = AppDataSource.getRepository(Product);
