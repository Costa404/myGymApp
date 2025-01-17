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
    cors: {
      origin: "*", // Permite o frontend na porta 5173
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true, // Necessário se você estiver utilizando cookies de autenticação
    },
  });

  await server.start();

  return server;
};

export const apolloServerMiddleware = (server) => expressMiddleware(server);
