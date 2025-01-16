import { gql } from "@apollo/client";

const GET_WORKOUT_STATS = gql`
  query GetWorkoutStats {
    workoutStats {
      id
      workoutName
      comments
      duration
      workoutId
      date
      exerciseStats {
        exerciseName
        reps
        weight
      }
    }
  }
`;

export default GET_WORKOUT_STATS;
