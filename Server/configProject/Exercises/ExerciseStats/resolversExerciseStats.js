// import ExerciseStats from "../../Models/ExerciseStats.js";

// const resolversExerciseStats = {
//   Query: {
//     exerciseStats: async () => {
//       try {
//         // Recupera todos os stats de exercícios
//         const stats = await ExerciseStats.find();
//         console.log("Stats recuperados:", stats);

//         // Transformando os dados para incluir 'id' no lugar de '_id'
//         // const transformedStats = stats.map((stat) => ({
//         //   ...stat.toObject(), // Garante que o objeto do Mongo seja serializável
//         //   id: stat._id.toString(), // Mapeia _id para id
//         // }));

//         // Agrupando por workoutId
//         const groupedByWorkoutId = stats.reduce((acc, stat) => {
//           const { workoutId } = stat;
//           if (!acc[workoutId]) acc[workoutId] = [];
//           acc[workoutId].push(stat);
//           return acc;
//         }, {});

//         const result = Object.entries(groupedByWorkoutId).map(
//           ([workoutId, exercises]) => ({
//             workoutId,
//             exercises,
//           })
//         );

//         // console.log("Resultado final:", JSON.stringify(result, null, 2));

//         return result;
//       } catch (error) {
//         console.error("Erro ao buscar stats", error);
//         return null;
//       }
//     },
//   },
// };

// export default resolversExerciseStats;
