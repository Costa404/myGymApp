import { createContext, useContext, useState, ReactNode } from "react";

interface Exercise {
  id: string;
  exerciseName: string;
  category: string;
}

interface SelectedExerciseContextType {
  selectedExercise: Exercise | null;
  selectExercise: (exercise: Exercise) => void;
  clearExercise: () => void;
}

const SelectedExerciseContext = createContext<
  SelectedExerciseContextType | undefined
>(undefined);

export const SelectedExerciseProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );

  const selectExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  const clearExercise = () => {
    setSelectedExercise(null);
  };

  return (
    <SelectedExerciseContext.Provider
      value={{ selectedExercise, selectExercise, clearExercise }}
    >
      {children}
    </SelectedExerciseContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useSelectedExercise = () => {
  const context = useContext(SelectedExerciseContext);
  if (context === undefined) {
    throw new Error(
      "useSelectedExercise must be used within a SelectedExerciseProvider"
    );
  }
  return context;
};
