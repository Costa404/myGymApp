import { useWorkoutId } from "../context/useWorkoutId";
import MainModal from "./MainModal/MainModal";
import { useModalStore } from "./Utility/useModalStore";

const MyData = () => {
  const { openMainModal, isModalSignUp, isMainModalOpen, isModalLogin } =
    useModalStore();
  const { workoutId } = useWorkoutId();

  const handleClick = () => {
    openMainModal();
    console.log("Workout ID compartilhado:", workoutId);
  };

  return (
    <div
      className="d-flex justify-content-center flex-column align-items-center h-50"
      style={{ zIndex: 1 }}
    >
      {!isMainModalOpen && !isModalSignUp && !isModalLogin && (
        <button onClick={handleClick} className="btn btn-primary fs-1">
          Let's Start
        </button>
      )}

      <MainModal />
    </div>
  );
};

export default MyData;
