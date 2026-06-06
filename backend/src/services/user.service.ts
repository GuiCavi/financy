import { prisma } from "../../prisma/prisma";
import { UpdateUserInput } from "../dtos/input/user.input";
import { UserModel } from "../models/user.model";

export class UserService {
  async findUser(id: string): Promise<UserModel> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async listUsers(): Promise<UserModel[]> {
    return prisma.user.findMany();
  }

  async updateUser(data: UpdateUserInput, id: string) {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        name: data.name,
      },
    });
  }
}