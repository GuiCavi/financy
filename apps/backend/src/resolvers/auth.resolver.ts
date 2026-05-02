import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";

import { LoginInput, RegisterInput } from "../dtos/input/auth.input";
import { LoginOutput, MeOutput, RegisterOutput } from "../dtos/output/auth.output";
import { AuthService } from "../services/auth.service";
import { IsAuth } from "../middlewares/auth.middleware";
import { WithCurrentUser } from "../graphql/decorators/user.decorator";
import { UserModel } from "../models/user.model";

@Resolver()
export class AuthResolver {
  private readonly authService: AuthService = new AuthService();

  @Mutation(() => RegisterOutput)
  async register(
    @Arg("data", () => RegisterInput) data: RegisterInput,
  ): Promise<RegisterOutput> {
    return this.authService.register(data);
  }

  @Mutation(() => LoginOutput)
  async login(
    @Arg("data", () => LoginInput) data: LoginInput,
  ): Promise<LoginOutput> {
    return this.authService.login(data);
  }

  @Query(() => MeOutput)
  @UseMiddleware(IsAuth)
  async me(
    @WithCurrentUser() user: UserModel
  ) {
    return { user };
  }
}