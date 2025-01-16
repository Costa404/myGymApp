import { useMutation } from "@apollo/client";
import { ADD_WORKOUT_STATS } from "../../Graphql/Mutations/MutationAddWorkoutStats";
import { useSelectedExercise } from "../../context/useSelectedExercise";
import { useEffect, useState } from "react";
import { useWorkoutId } from "../../context/useWorkoutId";
import { useAddExerciseInputs } from "../Utility/useAddExerciseInputs";

// Defina a interface para o estado
interface ExerciseStat {
  exerciseName: string | undefined;
  reps: string;
  weight: string;
}

interface WorkoutStats {
  workoutName: string;
  comments: string;
  duration: string;
  date: string;
  workoutId: string;
  exerciseStats: ExerciseStat[];
}

export const useAddWorkoutInputs = () => {
  const { selectedExercise } = useSelectedExercise();
  const { formData } = useAddExerciseInputs();
  const { workoutId } = useWorkoutId();
  console.log("workout", workoutId);

  const [dataWorkoutStats, setDataWorkoutStats] = useState<WorkoutStats>({
    workoutName: "",
    comments: "",
    duration: "",
    date: "", // Será preenchido automaticamente
    workoutId: workoutId,
    exerciseStats: [], // Agora é um array
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const currentDate = `${year}-${month}-${day}`;

    setDataWorkoutStats((prevState) => ({
      ...prevState,
      date: currentDate,
    }));
  };

  useEffect(() => {
    handleCurrentDate();
  }, [workoutId]);

  const [addWorkoutStats] = useMutation(ADD_WORKOUT_STATS);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataWorkoutStats((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addExerciseStat = () => {
    const { reps, weight } = formData;

    const newReps = reps || "1";
    const newWeight = weight || "1";

    setDataWorkoutStats((prevState) => ({
      ...prevState,
      exerciseStats: [
        ...prevState.exerciseStats,
        {
          exerciseName: selectedExercise?.exerciseName,
          reps: newReps,
          weight: newWeight,
        },
      ],
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await addWorkoutStats({
        variables: {
          ...dataWorkoutStats,
        },
      });

      console.log("DATA:", data);
      console.log("Workout Stats added:", data);
    } catch (err) {
      console.error("Error adding workout stats:", err);
      setError("Erro ao adicionar estatísticas do treino. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return {
    dataWorkoutStats,
    setDataWorkoutStats,
    loading,
    error,
    handleChange,
    handleSubmit,
    handleCurrentDate,
    addExerciseStat,
    selectedExercise,
  };
};
