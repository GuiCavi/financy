import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";

import { CreateTransactionInput, UpdateTransactionInput } from "../dtos/input/transaction.input";
import { WithCurrentUser } from "../graphql/decorators/user.decorator";
import { IsAuth } from "../middlewares/auth.middleware";
import { CategoryModel } from "../models/category.model";
import { TransactionModel } from "../models/transaction.model";
import { UserModel } from "../models/user.model";
import { CategoryService } from "../services/category.service";
import { TransactionService } from "../services/transaction.service";
import { UserService } from "../services/user.service";

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private readonly transactionService: TransactionService = new TransactionService();

  private readonly userService: UserService = new UserService();

  private readonly categoryService: CategoryService = new CategoryService();

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg("data", () => CreateTransactionInput) data: CreateTransactionInput,
    @WithCurrentUser() user: UserModel,
  ): Promise<TransactionModel> {
    return this.transactionService.createTransaction(data, user.id);
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg("data", () => UpdateTransactionInput) data: UpdateTransactionInput,
    @Arg("id", () => String) id: string,
    @WithCurrentUser() user: UserModel,
  ): Promise<TransactionModel> {
    return this.transactionService.updateTransaction(data, id, user.id);
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg("id", () => String) id: string,
    @WithCurrentUser() user: UserModel,
  ): Promise<boolean> {
    await this.transactionService.deleteTransaction(id, user.id);
    return true;
  }

  @Query(() => [TransactionModel])
  async listTransactions(
    @WithCurrentUser() user: UserModel,
  ): Promise<TransactionModel[]> {
    return this.transactionService.listTransactions(user.id);
  }

  @Query(() => [TransactionModel])
  async listTransactionsByCategory(
    @Arg("categoryId", () => String) categoryId: string,
    @WithCurrentUser() user: UserModel,
  ): Promise<TransactionModel[]> {
    return this.transactionService.listTransactionsByCategory(categoryId, user.id);
  }

  @FieldResolver(() => UserModel)
  async user(@Root() parent: TransactionModel): Promise<UserModel> {
    return this.userService.findUser(parent.userId);
  }

  @FieldResolver(() => CategoryModel)
  async category(@Root() parent: TransactionModel): Promise<CategoryModel> {
    return this.categoryService.findCategory(parent.categoryId);
  }
}