import { gql } from "apollo-server-express";

const typeDefsExerciseList = gql`
  type Exercise {
    id: ID!
    exerciseName: String!
    category: String!
  }

  type Query {
    exercises: [Exercise]
  }
`;

export default typeDefsExerciseList;
