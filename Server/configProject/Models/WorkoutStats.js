import mongoose from "mongoose";

const exerciseStatsSchema = new mongoose.Schema({
  exerciseName: { type: String, required: true },
  reps: { type: String, required: true },
  weight: { type: String, required: true },
});

const WorkoutStatsSchema = new mongoose.Schema({
  workoutName: { type: String, required: true },
  date: { type: String, required: true },
  comments: { type: String, required: true },
  duration: { type: String, required: true },
  workoutId: { type: String, required: true },
  exerciseStats: [exerciseStatsSchema],
});
const WorkoutStats = mongoose.model("WorkoutStats", WorkoutStatsSchema);

export default WorkoutStats;
