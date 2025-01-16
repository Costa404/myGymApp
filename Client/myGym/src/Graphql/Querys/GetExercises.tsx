import { gql } from "@apollo/client";

const GET_EXERCISES = gql`
  query GetExercises {
    exercises {
      id
      exerciseName
      category
    }
  }
`;

export default GET_EXERCISES;
