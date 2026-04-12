import { prisma } from "../../prisma/prisma";
import { UserModel } from "../models/user";

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
}