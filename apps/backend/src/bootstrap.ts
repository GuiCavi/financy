// eslint-disable-next-line import/order
import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import express from "express";
import { buildSchema } from "type-graphql";

import { env } from "../config/env";

import { buildContext } from "./graphql/context";
import { AuthResolver } from "./resolvers/auth.resolver";
import { CategoryResolver } from "./resolvers/category.resolver";
import { UserResolver } from "./resolvers/user.resolver";

export async function bootstrap() {
  const app = express();

  const schema = await buildSchema({
    resolvers: [AuthResolver, UserResolver, CategoryResolver],
    validate: false,
    emitSchemaFile: "./schema.graphql",
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  app.use("/graphql", express.json(), expressMiddleware(server, {
    context: buildContext,
  }));

  app.listen(env.PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${env.PORT}`);

    console.log(`🚀 Apollo server ready at http://localhost:${env.PORT}/graphql`);
  });
}