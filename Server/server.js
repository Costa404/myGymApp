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

// const FRONTEND_URL =
//   process.env.VITE_FRONTEND_URL ||
//   (process.env.NODE_ENV === "production"
//     ? "https://my-gym-app-client.vercel.app"
//     : "http://localhost:5173");

const allowedOrigins = [
  "https://my-gym-app-client.vercel.app",
  "https://my-gym-app-client-6e0oo4ktu-costa404s-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
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

// app.listen(process.env.PORT || 4000, () => {
//   console.log(`Servidor em execução na porta ${process.env.PORT || 4001}`);
// });
