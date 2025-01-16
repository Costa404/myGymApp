import { makeExecutableSchema } from "@graphql-tools/schema";
import merge from "lodash.merge"; // Combina resolvers em um único objeto

import typeDefsExerciseList from "../configProject/Exercises/ExerciseList/typeDefsExerciseList.js";
import resolversExerciseList from "../configProject/Exercises/ExerciseList/resolversExerciseList.js";
// import typeDefsExerciseStats from "../configProject/Exercises/ExerciseStats/typeDefsExerciseStats.js";
// import resolversExerciseStats from "../configProject/Exercises/ExerciseStats/resolversExerciseStats.js";

import resolversSignup from "../configProject/AuthData/Resolvers/resolversSignup.js";
import typeDefsSignup from "../configProject/AuthData/SchemasAuth/typeDefsSignup.js";
import typeDefsLogin from "../configProject/AuthData/SchemasAuth/typeDefsLogin.js";
import resolversLogin from "../configProject/AuthData/Resolvers/resolversLogin.js";

import typeDefsCurrentUser from "../configProject/AuthData/SchemasAuth/typeDefsCurrentUser.js";
import resolversCurrentUser from "../configProject/AuthData/Resolvers/resolversCurrentUser.js";
import resolversWorkoutStats from "../configProject/Exercises/WorkoutStats/resolversWorkoutStats.js";
import typeDefsWorkoutStats from "../configProject/Exercises/WorkoutStats/typeDefsWorkoutStats.js";

const combinedResolvers = merge(
  {},
  resolversExerciseList,
  // resolversExerciseStats,
  resolversSignup,
  resolversLogin,
  resolversCurrentUser,
  resolversWorkoutStats
);

export const schema = makeExecutableSchema({
  typeDefs: [
    typeDefsExerciseList,
    // typeDefsExerciseStats,
    typeDefsSignup,
    typeDefsLogin,
    typeDefsCurrentUser,
    typeDefsWorkoutStats,
  ],
  resolvers: combinedResolvers,
});
