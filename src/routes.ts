import { Router } from "express";
import userRoute from "./modules/user/user.route";
import roleRoute from "./modules/role/role.route";
import authRoute from "./modules/auth/auth.route";
import productRoute from "./modules/product/product.route";

const router = Router();

router.use("/users", userRoute);
router.use("/roles", roleRoute);
router.use("/auth", authRoute);
router.use("/products", productRoute);

export default router;
