import { User } from "./user.model";
import { UserRepository } from "./user.repository";

export class UserService {
  async getAll(): Promise<User[]> {
    return await UserRepository.find({ relations: ["roles"] });
  }

  async getById(id: string): Promise<User | null> {
    return await UserRepository.findOne({
      where: { id },
      relations: ["roles"],
    });
  }
}
