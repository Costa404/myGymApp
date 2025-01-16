import express from "express";
import { createServer } from "http";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./ServerUtility/db.js";
import createSocketServer from "./ServerUtility/socketioServer.js";
import {
  createApolloServer,
  apolloServerMiddleware,
} from "./ServerUtility/ApolloServer.js";
import authMiddleware from "./configProject/Middlewares/authMiddleware.js";
import dotenv from "dotenv";

dotenv.config();

console.log("JWT_SECRET:", process.env.JWT_SECRET);

connectDB();

// Criar o app Express
const app = express();

// Criar o servidor HTTP
const httpServer = createServer(app);

// No arquivo principal do servidor (onde você configurou o Express)
app.use(
  cors({
    origin: "https://my-gym-app-client.vercel.app", // Substitua pela URL do seu frontend no Vercel
    methods: ["GET", "POST", "OPTIONS"], // Métodos que você permite
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
    credentials: true, // Se você usar cookies de autenticação
  })
);

app.use(bodyParser.json());

// app.use(authMiddleware);

const apolloServer = await createApolloServer(httpServer);
app.use("/graphql", apolloServerMiddleware(apolloServer));

const io = createSocketServer(httpServer);

httpServer.listen(4000, () => {
  console.log(`🚀 Server running at http://localhost:4000/graphql`);
});
