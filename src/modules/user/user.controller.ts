import { Router, Request, Response } from "express";
import { UserService } from "./user.service";
import { validationMiddleware } from "../../shared/middlewares/validation.middleware";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";

const router = Router();
const userService = new UserService();

// GET api/users
router.get("/", async (req: Request, res: Response) => {
  const users = await userService.getAll();
  res.json(users);
});

// GET api/users/:id
router.get("/:id", async (req: Request, res: Response) => {
  const user = await userService.getById(req.params.id);
  if (!user) res.status(404).json({ message: "User_not_found" });
  res.json(user);
});

//POST api/users
router.post(
  "/",
  validationMiddleware(CreateUserDto),
  async (req: Request, res: Response) => {
    const user = await userService.create(req.body);
    res.status(201).json(user);
  }
);

// PUT api/users/:id
router.put(
  "/:id",
  validationMiddleware(UpdateUserDto),
  async (req: Request, res: Response) => {
    const user = await userService.update(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: "User_not_found" });
    res.json(user);
  }
);

export default router;
