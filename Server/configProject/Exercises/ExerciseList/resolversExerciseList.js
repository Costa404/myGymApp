import ExerciseList from "../../Models/ExerciseList.js";
const resolversExerciseList = {
  Query: {
    exercises: async (_, __) => {
      try {
        return await ExerciseList.find();
      } catch (error) {
        console.error("Erro fetch exercícios", error);
        throw new Error("Erro fetch exercícios");
      }
    },
  },
};

export default resolversExerciseList;
