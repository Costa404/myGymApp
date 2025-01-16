import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import { schema } from "./Schemas.js";

export const createApolloServer = async (httpServer) => {
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }) => {
      const user = req.user;

      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      return { user };
    },
  });

  await server.start();

  return server;
};

export const apolloServerMiddleware = (server) => expressMiddleware(server);
