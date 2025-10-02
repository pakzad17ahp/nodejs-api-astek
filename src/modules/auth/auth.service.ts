import { UserRepository } from "../user/user.repository";
import jwt from "jsonwebtoken";

export class AuthService {
  async signin(username: string, password: string): Promise<string | null> {
    const user = await UserRepository.findOne({
      where: { username },
      relations: ["role"],
    });
    if (!user) return null;
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return null;

    const payload = {
      id: user.id,
      username: user.username,
      is_super_admin: user.is_super_admin,
      role: user.role,
    };

    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });
  }
}
