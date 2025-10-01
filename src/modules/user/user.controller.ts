import { Router, Request, Response } from "express";
import { UserService } from "./user.service";

const router = Router();
const userService = new UserService();

// GET api/users
router.get("/", async (req: Request, res: Response) => {
  const users = await userService.getAll();
  res.json(users);
});

export default router;
