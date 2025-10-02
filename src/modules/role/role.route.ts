import { Router } from "express";
import { RoleController } from "./role.controller";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import {
  action,
  checkPermission,
  section,
} from "../../shared/middlewares/check-permission.middleware";
import { validationMiddleware } from "../../shared/middlewares/validation.middleware";
import { CreateRoleDto } from "./dtos/create-role.dto";

const router = Router();
const roleController = new RoleController();

router.get(
  "/",
  authMiddleware(false),
  checkPermission(section.role, action.view),
  roleController.getAll.bind(roleController)
);

router.get(
  "/:id",
  authMiddleware(false),
  checkPermission(section.role, action.view),
  roleController.getById.bind(roleController)
);

router.post(
  "/",
  authMiddleware(false),
  checkPermission(section.role, action.create),
  validationMiddleware(CreateRoleDto),
  roleController.create.bind(roleController)
);

router.put(
  "/:id",
  authMiddleware(false),
  checkPermission(section.role, action.update),
  roleController.update.bind(roleController)
);

export default router;
