// src/graphql/schema.ts
import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers";
import { typeDefs } from "@repo/db/typeDefs";

// Load all .graphql type definitions

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});