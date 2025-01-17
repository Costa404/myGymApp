import { Server as SocketIO } from "socket.io";
// import ExerciseStats from "../configProject/Models/ExerciseStats.js";

const createSocketServer = (httpServer) => {
  const io = new SocketIO(httpServer, {
    cors: {
      origin: "https://my-gym-app-client.vercel.app",

      methods: ["GET", "POST"],
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
        // const newExerciseStats = new ExerciseStats({
        //   exerciseName,
        //   reps,
        //   weight,
        //   workoutId,
        // });

        // const savedStats = await newExerciseStats.save();
        // console.log("Dados de exercício salvos:", savedStats);

        // socket.emit("exerciseStatsSaved", { success: true, stats: savedStats });
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
