import { Router } from "express";
import { validationMiddleware } from "../../shared/middlewares/validation.middleware";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { UserController } from "./user.controller";
import {
  action,
  checkPermission,
  section,
} from "../../shared/middlewares/check-permission.middleware";
import { accountUpdatePermission } from "../../shared/middlewares/account-update-permission.middleware";

const userController = new UserController();
const router = Router();

// GET api/users
router.get(
  "/",
  authMiddleware(false),
  checkPermission(section.account, action.view),
  userController.getAll.bind(userController)
);

// GET api/users/:id
router.get(
  "/:id",
  authMiddleware(false),
  checkPermission(section.account, action.view),
  userController.getById.bind(userController)
);

//POST api/users
router.post(
  "/",
  authMiddleware(false),
  checkPermission(section.account, action.create),
  validationMiddleware(CreateUserDto),
  userController.create.bind(userController)
);

// PUT api/users/:id
router.put(
  "/:id",
  authMiddleware(true),
  checkPermission(section.account, action.update),
  validationMiddleware(UpdateUserDto),
  accountUpdatePermission,
  userController.update.bind(userController)
);

export default router;
