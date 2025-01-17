import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useSelectedExercise } from "../../context/useSelectedExercise";
import { useWorkoutId } from "../../context/useWorkoutId";

export const useAddExerciseInputs = () => {
  const { selectedExercise } = useSelectedExercise();
  const { workoutId } = useWorkoutId();

  const [formData, setFormData] = useState({ reps: "", weight: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [submittedStats, setSubmittedStats] = useState<
    { reps: string; weight: string; exerciseName: string }[] | null
  >(null);

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("https://mygymapp.onrender.com", {
      transports: ["websocket", "polling"],
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

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
      workoutId,
    };

    console.log("Enviando:", exerciseData);

    try {
      setLoading(true);

      if (socket) {
        socket.emit("exerciseStatsUpdated", exerciseData);
      } else {
        console.error("Socket not connected!");
      }

      setSubmittedStats((prevStats) =>
        prevStats ? [...prevStats, exerciseData] : [exerciseData]
      );

      setFormData({ reps: "", weight: "" });
    } catch (err) {
      console.error(err);
      setError(new Error("Erro ao enviar dados"));
    } finally {
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
