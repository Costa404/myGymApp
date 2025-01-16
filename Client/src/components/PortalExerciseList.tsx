import ReactDOM from "react-dom";
import ExerciseList from "./Pages/ExerciseList";
import { useModalStore } from "./Utility/useModalStore";

const PortalExerciseList = () => {
  const { closeModalExercise } = useModalStore();

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div
        className="modal-content w-25 bg-black d-flex border-dark border portExercisesMobile mainModalMobile"
        style={{ maxHeight: "75%" }}
      >
        <span>
          <button onClick={closeModalExercise} className=" btn fs-4 btn-danger">
            close
          </button>
        </span>
        <ExerciseList />
      </div>
    </div>,
    document.getElementById("modal-exercises")!
  );
};

export default PortalExerciseList;
