import { gql } from "@apollo/client";

export const ADD_WORKOUT_STATS = gql`
  mutation AddWorkoutStats(
    $workoutName: String!
    $comments: String!
    $duration: String!
    $workoutId: String!
    $date: String!
    $exerciseStats: [ExerciseStatInput!]!
  ) {
    addWorkoutStats(
      workoutName: $workoutName
      comments: $comments
      duration: $duration
      workoutId: $workoutId
      date: $date
      exerciseStats: $exerciseStats # Passando o array de objetos
    ) {
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
export const DELETE_WORKOUT = gql`
  mutation DeleteWorkout($deleteWorkoutId: ID!) {
    deleteWorkout(id: $deleteWorkoutId)
  }
`;
