import { useState } from "react";

import { io } from "socket.io-client";
import { useSelectedExercise } from "../../context/useSelectedExercise";

import { useWorkoutId } from "../../context/useWorkoutId";

const socket = io("my-gym-app-server-ps75ihcfz-costa404s-projects.vercel.app");

export const useAddExerciseInputs = () => {
  const { selectedExercise } = useSelectedExercise();

  const [formData, setFormData] = useState({ reps: "", weight: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [submittedStats, setSubmittedStats] = useState<
    { reps: string; weight: string; exerciseName: string }[] | null
  >(null);
  const { workoutId } = useWorkoutId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedExercise) {
      alert("Selecione um exercício primeiro!");
      return;
    }

    const exerciseData = {
      reps: formData.reps,
      weight: formData.weight,
      exerciseName: selectedExercise.exerciseName,
    };

    console.log(workoutId);

    try {
      setLoading(true);
      socket.emit("exerciseStatsUpdated", exerciseData);

      setSubmittedStats((prevStats) =>
        prevStats ? [...prevStats, exerciseData] : [exerciseData]
      );

      setFormData({ reps: "", weight: "" });
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(new Error("Erro ao enviar dados"));
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    submittedStats,
    handleChange,
    handleSubmit,
    selectedExercise,
  };
};
