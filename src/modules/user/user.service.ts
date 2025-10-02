import { User } from "./user.model";
import { UserRepository } from "./user.repository";

export class UserService {
  async getAll(): Promise<User[]> {
    return await UserRepository.find({ relations: ["role"] });
  }

  async getById(id: string): Promise<User | null> {
    return await UserRepository.findOne({
      where: { id },
      relations: ["role"],
    });
  }

  async create(data: Partial<User>): Promise<User> {
    const user = await UserRepository.create(data);
    return await UserRepository.save(user);
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const user = await UserRepository.findOneBy({ id });
    if (!user) return null;
    Object.assign(user, data);
    return await UserRepository.save(user);
  }
}
