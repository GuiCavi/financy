// eslint-disable-next-line import/order
import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import express from "express";
import { buildSchema } from "type-graphql";

import { env } from "../config/env";

import { buildContext } from "./graphql/context";
import { AuthResolver } from "./resolvers/auth.resolver";
import { CategoryResolver } from "./resolvers/category.resolver";
import { TransactionResolver } from "./resolvers/transaction.resolver";
import { UserResolver } from "./resolvers/user.resolver";

import { createStorageAdapter } from "./upload/storage/storage-adapter.factory";
import { createUploadRouter } from "./upload/upload.router";

export async function bootstrap() {
  const app = express();
  app.use(cors({
    origin: "*",
    credentials: true,
  }));

  const schema = await buildSchema({
    resolvers: [AuthResolver, UserResolver, CategoryResolver, TransactionResolver],
    validate: false,
    emitSchemaFile: "./schema.graphql",
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  // Create storage adapter once at startup
  const storageAdapter = createStorageAdapter();
  const storagePath = env.AVATAR_STORAGE_PATH ?? "./uploads";

  // Mount upload router BEFORE graphql middleware
  app.use("/upload", createUploadRouter(storageAdapter));

  // Serve static files from uploads directory
  app.use("/uploads", express.static(storagePath));

  app.use("/graphql", express.json(), expressMiddleware(server, {
    context: buildContext,
  }));

  app.listen(env.PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${env.PORT}`);

    console.log(`🚀 Apollo server ready at http://localhost:${env.PORT}/graphql`);
  });
}