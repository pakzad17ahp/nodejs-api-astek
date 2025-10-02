import { Router } from "express";
import { validationMiddleware } from "../../shared/middlewares/validation.middleware";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { UserController } from "./user.controller";

const userController = new UserController();
const router = Router();

// GET api/users
router.get("/", userController.getAll.bind(userController));

// GET api/users/:id
router.get("/:id", userController.getById.bind(userController));

//POST api/users
router.post(
  "/",
  validationMiddleware(CreateUserDto),
  userController.create.bind(userController)
);

// PUT api/users/:id
router.put(
  "/:id",
  validationMiddleware(UpdateUserDto),
  userController.update.bind(userController)
);

export default router;
