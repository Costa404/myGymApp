import { create } from "zustand";

// --- Estado Global com Zustand ---
type ModalState = {
  isMainModalOpen: boolean;
  isModalOpenExerciseList: boolean;

  selectedExercise: string | null;
  openMainModal: () => void;
  closeMainModal: () => void;
  openModalExercise: () => void;
  closeModalExercise: () => void;
  selectExercise: (exercise: string) => void;

  // ====================
  // Auth
  // ====================
  isModalSignUp: boolean;
  openModalSignup: () => void;
  closeModalSignup: () => void;
  isModalLogin: boolean;
  openModalLogin: () => void;
  closeModalLogin: () => void;
};

// --- Store Zustand ---
export const useModalStore = create<ModalState>((set) => ({
  isMainModalOpen: false,
  isModalOpenExerciseList: false,
  selectedExercise: null,
  isModalSignUp: false,
  isModalLogin: false,

  // Ações
  openModalSignup: () => set({ isModalSignUp: true }),
  closeModalSignup: () => set({ isModalSignUp: false }),
  openModalLogin: () => set({ isModalLogin: true }),
  closeModalLogin: () => set({ isModalLogin: false }),
  openMainModal: () => set({ isMainModalOpen: true }),
  closeMainModal: () => set({ isMainModalOpen: false }),
  openModalExercise: () => set({ isModalOpenExerciseList: true }),
  closeModalExercise: () => set({ isModalOpenExerciseList: false }),
  selectExercise: (exercise) =>
    set({
      selectedExercise: exercise,
      isModalOpenExerciseList: false,
      isMainModalOpen: true,
    }),
}));
