import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";

import { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input";
import { WithCurrentUser } from "../graphql/decorators/user.decorator";
import { IsAuth } from "../middlewares/auth.middleware";
import { CategoryModel } from "../models/category.model";
import { TransactionModel } from "../models/transaction.model";
import { UserModel } from "../models/user.model";
import { CategoryService } from "../services/category.service";
import { TransactionService } from "../services/transaction.service";
import { UserService } from "../services/user.service";

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
  private readonly categoryService: CategoryService = new CategoryService();

  private readonly userService: UserService = new UserService();

  private readonly transationService: TransactionService = new TransactionService();

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg("data", () => CreateCategoryInput) data: CreateCategoryInput,
    @WithCurrentUser() user: UserModel,
  ): Promise<CategoryModel> {
    return this.categoryService.createCategory(data, user.id);
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg("data", () => UpdateCategoryInput) data: UpdateCategoryInput,
    @Arg("id", () => String) id: string,
    @WithCurrentUser() user: UserModel,
  ): Promise<CategoryModel> {
    return this.categoryService.updateCategory(data, id, user.id);
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg("id", () => String) id: string,
    @WithCurrentUser() user: UserModel,
  ): Promise<boolean> {
    await this.categoryService.deleteCategory(id, user.id);
    return true;
  }

  @Query(() => [CategoryModel])
  async listCategories(
    @WithCurrentUser() user: UserModel,
  ): Promise<CategoryModel[]> {
    return this.categoryService.listCategories(user.id);
  }

  @FieldResolver(() => UserModel)
  async user(@Root() parent: CategoryModel): Promise<UserModel> {
    return this.userService.findUser(parent.userId);
  }

  @FieldResolver(() => [TransactionModel])
  async transactions(@Root() parent: CategoryModel): Promise<TransactionModel[]> {
    return this.transationService.listTransactionsByCategory(parent.id);
  }

  @FieldResolver(() => Number)
  async totalAmount(@Root() parent: CategoryModel): Promise<number> {
    return this.transationService.sumAmountByCategory(parent.id);
  }
}