import WorkoutStats from "../../Models/WorkoutStats.js";
const resolversWorkoutStats = {
  Query: {
    // Resolver para a consulta (query) que busca todos os WorkoutStats
    workoutStats: async () => {
      try {
        const workoutStats = await WorkoutStats.find();

        return workoutStats;
      } catch (error) {
        console.log("Error fetching workoutStats", error);
        throw new Error("Error fetching workoutStats: " + error.message);
      }
    },
  },

  Mutation: {
    // Resolver para a mutação (mutation) que adiciona um novo WorkoutStats
    addWorkoutStats: async (
      _,
      { workoutName, comments, duration, workoutId, date, exerciseStats }
    ) => {
      try {
        const newWorkoutStats = new WorkoutStats({
          workoutName,
          comments,
          duration,
          workoutId,
          date,
          exerciseStats,
        });

        await newWorkoutStats.save();

        console.log(
          "Resultado final:",
          JSON.stringify(newWorkoutStats, null, 2)
        );
        return newWorkoutStats;
      } catch (error) {
        throw new Error("Error adding workout stats: " + error.message);
      }
    },

    deleteWorkout: async (_, { id }) => {
      try {
        const result = await WorkoutStats.deleteOne({ _id: id });

        return true;
      } catch (error) {
        console.error("Error deleting workout:", error);
        throw new Error("Error deleting workout: " + error.message);
      }
    },
  },
};

export default resolversWorkoutStats;
