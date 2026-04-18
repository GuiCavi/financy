import { Field, GraphQLISODateTime, ObjectType } from "type-graphql";

import { TransactionModel } from "./transaction.model";
import { UserModel } from "./user.model";

@ObjectType()
export class CategoryModel {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  userId!: string;

  @Field(() => UserModel, { nullable: true })
  user?: UserModel;

  @Field(() => [TransactionModel], { nullable: true })
  transactions?: TransactionModel[];

  @Field(() => Number)
  totalAmount?: number;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}