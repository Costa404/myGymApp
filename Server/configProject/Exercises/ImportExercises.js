import mongoose from "mongoose";
import exercises from "./ExercisesData.js";
import connectDB from "../db.js";

const exerciseSchema = new mongoose.Schema({
  exerciseName: String,
  category: String,
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

const importExercises = async () => {
  try {
    await connectDB();

    await Exercise.insertMany(exercises);

    console.log("Exercícios importados com sucesso!");
  } catch (error) {
    console.error("Erro ao importar exercícios", error);
  } finally {
    mongoose.connection.close();
  }
};

importExercises();
