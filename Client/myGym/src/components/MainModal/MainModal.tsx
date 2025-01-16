import ReactDOM from "react-dom";
import { useMainModalLogic } from "./useMainModalLogic";
import InputsAddExercise from "../InputsAddExercise";
import PortalExerciseList from "../PortalExerciseList";
import { useSelectedExercise } from "../../context/useSelectedExercise";

const MainModalUI = () => {
  const {
    isMainModalOpen,
    dataWorkoutStats,
    handleChange,
    handleClose,
    handleFinish,
    time,
    formatTime,
    openModalExercise,
    isModalOpenExerciseList,
  } = useMainModalLogic();
  const { selectedExercise } = useSelectedExercise();

  if (!isMainModalOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="modal-overlay h-100 mainModalMobile"
      style={{ zIndex: "1000" }}
    >
      <div
        className="modal-content  w-25 bg-black d-flex flex-column gap-3 border border-dark overflow-scroll mainModalMobile"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="h-25 d-flex justify-content-between">
            <h1>
              {formatTime(time.hours)}:{formatTime(time.minutes)}:
              {formatTime(time.seconds)}
            </h1>
            <span>
              <button
                onClick={handleFinish}
                className="btn btn-success fs-3 h-auto py-2 px-5"
              >
                Finish
              </button>
            </span>
          </div>
          <input
            name="workoutName"
            type="text"
            placeholder="Type workout name.."
            className="border-none mt-5 bg-black text-white fs-4"
            style={{ border: "none" }}
            value={dataWorkoutStats.workoutName}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex flex-column gap-3">
          {selectedExercise && <InputsAddExercise />}
          <button className="btn btn-primary fs-4" onClick={openModalExercise}>
            Add Exercise
          </button>

          <button className="fs-4 btn btn-danger" onClick={handleClose}>
            Cancel Workout
          </button>
          <button className="fs-4 btn btn-success">Pause</button>
        </div>
        <input
          name="comments"
          type="text"
          placeholder="Notes"
          className="fs-4"
          value={dataWorkoutStats.comments}
          onChange={handleChange}
        />
      </div>
      {isModalOpenExerciseList && <PortalExerciseList />}
    </div>,
    document.getElementById("modal-root")!
  );
};

export default MainModalUI;
