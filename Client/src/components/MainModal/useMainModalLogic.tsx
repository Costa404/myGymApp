import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useModalStore } from "../Utility/useModalStore";
import { useAddWorkoutInputs } from "./useAddWorkoutStats";
import { useWorkoutId } from "../../context/useWorkoutId";
import { useTimer } from "../Utility/Timer/useTimer";

export const useMainModalLogic = () => {
  const {
    isMainModalOpen,
    closeMainModal,
    openModalExercise,
    isModalOpenExerciseList,
  } = useModalStore();

  const {
    handleChange,
    dataWorkoutStats,
    setDataWorkoutStats,
    handleCurrentDate,
    handleSubmit,
  } = useAddWorkoutInputs();

  const { time, startTimer, stopTimer, resetTimer } = useTimer();

  const { setWorkoutId } = useWorkoutId();

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleClose = () => {
    closeMainModal();
  };

  useEffect(() => {
    if (isMainModalOpen) {
      startTimer();
    } else {
      stopTimer();
    }

    return () => stopTimer();
  }, [isMainModalOpen, startTimer, stopTimer]);

  const handleFinish = () => {
    const newWorkoutId = uuidv4();
    setWorkoutId(newWorkoutId);
    closeMainModal();
    resetTimer();
    handleCurrentDate();

    const formattedDuration = `${formatTime(time.hours)}:${formatTime(
      time.minutes
    )}:${formatTime(time.seconds)}`;

    setDataWorkoutStats((prevState) => ({
      ...prevState,
      duration:
        prevState.duration ||
        `${formatTime(time.hours)}:${formatTime(time.minutes)}:${formatTime(
          time.seconds
        )}`,
      date: prevState.date || new Date().toISOString(),
    }));
    console.log("formattedDuration", formattedDuration);
  };

  useEffect(() => {
    if (dataWorkoutStats.date && dataWorkoutStats.duration && !hasSubmitted) {
      handleSubmit();
      setHasSubmitted(true);
    }
  }, [dataWorkoutStats, handleSubmit, hasSubmitted]);

  const formatTime = (value: number) => (value < 10 ? `0${value}` : value);

  return {
    isMainModalOpen,
    dataWorkoutStats,
    handleChange,
    handleClose,
    handleFinish,
    time,
    formatTime,
    openModalExercise,
    isModalOpenExerciseList,
  };
};
