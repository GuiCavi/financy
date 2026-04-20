import { User } from "../../prisma/generated/prisma/client";
import { prisma } from "../../prisma/prisma";
import { LoginInput, RegisterInput } from "../dtos/input/auth.input";
import { comparePassword, hashPassword } from "../utils/hash";
import { signJwt } from "../utils/jwt";

export class AuthService {
  async register(data: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new Error("Usuário já cadastrado");
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    const token = this.generateToken(user, "1d");
    const refreshToken = this.generateToken(user, "7d");

    return { token, refreshToken, user };
  }

  async login(data: LoginInput) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!existingUser) {
      throw new Error("Usuário ou senha inválidos");
    }

    const isPasswordValid = await comparePassword(data.password, existingUser.password);

    if (!isPasswordValid) {
      throw new Error("Usuário ou senha inválidos");
    }

    const token = this.generateToken(existingUser, "1d");
    const refreshToken = this.generateToken(existingUser, "7d");

    return { token, refreshToken, user: existingUser };
  }

  private generateToken(user: User, expiresIn: string) {
    return signJwt({ id: user.id, email: user.email }, expiresIn);
  }
}