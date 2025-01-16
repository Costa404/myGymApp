import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type WorkoutContextType = {
  workoutId: string;
  setWorkoutId: (newId: string) => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [workoutId, setWorkoutId] = useState<string>(uuidv4());

  return (
    <WorkoutContext.Provider value={{ workoutId, setWorkoutId }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkoutId = (): WorkoutContextType => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkoutId deve ser usado dentro de um WorkoutProvider");
  }
  return context;
};
