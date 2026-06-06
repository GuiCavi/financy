import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";

import { UpdateUserInput } from "../dtos/input/user.input";
import { WithCurrentUser } from "../graphql/decorators/user.decorator";
import { IsAuth } from "../middlewares/auth.middleware";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";

@Resolver(() => UserModel)
@UseMiddleware(IsAuth)
export class UserResolver {
  private readonly userService: UserService = new UserService();

  @Mutation(() => UserModel)
  async updateUser(
    @Arg("data", () => UpdateUserInput) data: UpdateUserInput,
    @WithCurrentUser() user: UserModel,
  ): Promise<UserModel> {
    console.log(data, user);
    return this.userService.updateUser(data, user.id);
  }

  @Query(() => UserModel)
  async getUser(
    @Arg("id", () => String) id: string,
  ): Promise<UserModel> {
    return this.userService.findUser(id);
  }

  @Query(() => [UserModel])
  async listUsers(): Promise<UserModel[]> {
    return this.userService.listUsers();
  }
}