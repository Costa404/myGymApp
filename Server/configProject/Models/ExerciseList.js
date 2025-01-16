import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  exerciseName: { type: String, required: true },
  category: { type: String, required: true },
});
const exercises = mongoose.model("exercises", exerciseSchema);

export default exercises;
