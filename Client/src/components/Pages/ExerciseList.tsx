import { useQuery } from "@apollo/client";
import { useSelectedExercise } from "../../context/useSelectedExercise";
import { useModalStore } from "../Utility/useModalStore";
import GET_EXERCISES from "../../Graphql/Querys/GetExercises";
import LoadingSpinner from "../Utility/LoadingSpinner";

type Exercise = {
  id: string;
  exerciseName: string;
  category: string;
};

const ExerciseList = () => {
  const { selectExercise } = useSelectedExercise();
  const { error, data } = useQuery(GET_EXERCISES);

  const { closeModalExercise } = useModalStore();

  console.log("data", data);

  const handleSelect = (exercise: Exercise) => {
    selectExercise(exercise);
    closeModalExercise();
  };

  if (error) return <div className="w-100 bg-danger">Error</div>;

  if (!data || !data.exercises) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div
      className=" d-flex flex-column align-items-center overflow-scroll "
      style={{ maxHeight: "75vh" }}
    >
      <h1>Exercises List</h1>
      <ul
        className=" p-5 d-flex flex-column gap-2"
        style={{ maxHeight: "75vh" }}
      >
        {data.exercises.map((exercise: Exercise) => (
          <li
            key={exercise.id}
            onClick={() => handleSelect(exercise)}
            className="fs-4 hoverExerciseList"
            style={{ listStyle: "none" }}
          >
            {exercise.exerciseName} - {exercise.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseList;
