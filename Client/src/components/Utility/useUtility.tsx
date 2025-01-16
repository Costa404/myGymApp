import { useState } from "react";

export const useUtility = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenExerciseList, setIsModalOpenExerciseList] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openModalExercise = () => setIsModalOpenExerciseList(true);
  const closeModalExercise = () => setIsModalOpenExerciseList(false);
  return {
    openModal,
    closeModal,
    isModalOpen,
    closeModalExercise,
    isModalOpenExerciseList,
    openModalExercise,
  };
};
