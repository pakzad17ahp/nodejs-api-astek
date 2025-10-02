import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  constructor(private readonly authService = new AuthService()) {}

  async signin(req: Request, res: Response) {
    const { username, password } = req.body;

    const token = await this.authService.signin(username, password);

    if (!token) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ token });
  }
}
