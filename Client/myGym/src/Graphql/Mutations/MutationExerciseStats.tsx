import { gql } from "@apollo/client";

export const ADD_EXERCISE_STATS = gql`
  mutation ADD_EXERCISE_STATS($input: ExerciseStatsInput!) {
    ADD_EXERCISE_STATS(input: $input) {
      id
      reps
      weight
      exerciseName
    }
  }
`;
