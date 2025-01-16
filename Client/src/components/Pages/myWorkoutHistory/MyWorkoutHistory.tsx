import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import GET_WORKOUT_STATS from "../../../Graphql/Querys/GetWorkoutStats";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDeleteWorkout } from "./useDeleteWorkout";

import LoadingSpinner from "../../Utility/LoadingSpinner";

// Tipos para os dados da consulta
type ExerciseStat = {
  exerciseName: string;
  reps: number;
  weight: number;
};

type WorkoutStat = {
  id: string;
  workoutId: string;
  workoutName: string;
  comments: string;
  duration: number;
  date: string;
  exerciseStats: ExerciseStat[];
};

type WorkoutStatsData = {
  workoutStats: WorkoutStat[];
};

const MyWorkoutHistory = () => {
  const { loading, error, data, refetch } =
    useQuery<WorkoutStatsData>(GET_WORKOUT_STATS);
  const navigate = useNavigate();
  const { handleDelete } = useDeleteWorkout();

  console.log("data", data);

  if (loading)
    return (
      <p>
        <LoadingSpinner />
      </p>
    );
  if (error) return <p className="fs-1 text-danger">Please log in</p>;

  const deleteWorkout = async (id: string) => {
    await handleDelete({ id });

    refetch(); // Re-fetch data to update the list
  };

  return (
    <div className="container mt-5 ">
      <h2 className="mb-4">My Workout History</h2>

      <div className="list-group">
        {/* Iterando sobre o array 'workoutStats' */}
        {data?.workoutStats?.map((workout, i) => (
          <div key={i} className="list-group-item mb-4 p-4 border rounded">
            <div className="d-flex justify-content-between">
              <div>
                {" "}
                <p className="fs-4">
                  <strong className="fs-3">Workout Name:</strong>{" "}
                  {workout.workoutName}
                </p>
                <p className="fs-4">
                  <strong className="fs-3">Comments:</strong> {workout.comments}
                </p>
                <p className="fs-4">
                  <strong className="fs-3">Duration:</strong> {workout.duration}{" "}
                  minutes
                </p>
                <p className="fs-4">
                  <strong className="fs-3">Date:</strong> {workout.date}
                </p>
              </div>
              <RiDeleteBin6Line
                className="fs-1 text-danger hover"
                onClick={() => deleteWorkout(workout.id)}
              />
            </div>
            {/* Exibindo os exercícios dentro de cada workout */}
            <h5 className="mt-4 fs-2">Exercises:</h5>
            <ul className="list-group">
              {workout.exerciseStats.map((exercise, j) => (
                <li key={j} className="list-group-item mb-2">
                  <div className="d-flex justify-content-between">
                    <strong className="fs-3">{exercise.exerciseName}</strong>
                    <span className="badge bg-info text-dark fs-4">
                      {exercise.reps} reps
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="fs-4">Weight: {exercise.weight} kg</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button className="btn btn-primary fs-3 " onClick={() => navigate("/")}>
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default MyWorkoutHistory;
