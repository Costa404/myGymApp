import { Server as SocketIO } from "socket.io";

const allowedOrigins = [
  "https://my-gym-app-client.vercel.app",
  "https://my-gym-app-client-6e0oo4ktu-costa404s-projects.vercel.app",
];

const createSocketServer = (httpServer) => {
  const io = new SocketIO(httpServer, {
    cors: {
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS")); // ❌ Bloqueia
        }
      },
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Novo cliente conectado", socket.id);

    socket.on("subscribe", ({ subscriptionId }) => {
      console.log(
        `Cliente ${socket.id} se inscreveu no evento: ${subscriptionId}`
      );
    });

    socket.on("exerciseStatsUpdated", async (data) => {
      try {
        const { exerciseName, reps, weight, workoutId } = data;

        if (!exerciseName || !reps || !weight || !workoutId) {
          return socket.emit("error", { message: "Dados incompletos." });
        }

        console.log("workoutId", workoutId);
        socket.emit("exerciseStatsSaved", { success: true });
      } catch (error) {
        console.error("Erro ao salvar os dados de exercício:", error);
        socket.emit("error", { message: "Erro ao salvar os dados." });
      }
    });

    socket.on("disconnect", () => {
      console.log("Cliente desconectado", socket.id);
    });
  });

  return io;
};

export default createSocketServer;
