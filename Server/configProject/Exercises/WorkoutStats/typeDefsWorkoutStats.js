import { gql } from "apollo-server-express";

// Definindo os tipos GraphQL
const typeDefsWorkoutStats = gql`
  type ExerciseStats {
    exerciseName: String!
    reps: String!
    weight: String!
  }

  type WorkoutStats {
    id: ID!
    workoutName: String!
    comments: String!
    duration: String!
    workoutId: String!
    date: String!
    exerciseStats: [ExerciseStats!] # Alteração: array de objetos
  }

  input ExerciseStatInput { # Definindo o tipo de entrada para os exercícios
    exerciseName: String!
    reps: String!
    weight: String!
  }

  type Mutation {
    addWorkoutStats(
      workoutName: String!
      comments: String!
      duration: String!
      workoutId: String!
      date: String!
      exerciseStats: [ExerciseStatInput!]!
    ): WorkoutStats

    deleteWorkout(id: ID!): Boolean
  }

  type Query {
    workoutStats: [WorkoutStats]
  }
`;

export default typeDefsWorkoutStats;
