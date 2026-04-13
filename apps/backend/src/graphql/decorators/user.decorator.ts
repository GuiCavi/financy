import { createParameterDecorator, ResolverData } from "type-graphql";

import { prisma } from "../../../prisma/prisma";
import { UserModel } from "../../models/user.model";
import { GraphqlContext } from "../context";

export const WithCurrentUser = () => {
  return createParameterDecorator(
    async ({ context }: ResolverData<GraphqlContext>): Promise<UserModel | null> => {
      if (!context || !context.user) return null;
      let user: UserModel | null = null;

      try {
        user = await prisma.user.findUnique({
          where: {
            id: context.user,
          },
        });
        if (!user) throw new Error("Usuário não encontrado");
      } catch (error) {
        console.log("Error ao instanciar o gqluser");
      }

      return user;
    },
  );
};