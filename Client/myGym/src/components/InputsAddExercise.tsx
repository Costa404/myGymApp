import GetExercisesStats from "./Pages/Homepage/GetExercisesStats";
import { useAddExerciseInputs } from "./Utility/useAddExerciseInputs";

const InputsAddExercise = () => {
  const {
    formData,
    loading,
    error,
    submittedStats,
    handleChange,
    handleSubmit,
    selectedExercise,
  } = useAddExerciseInputs();

  return (
    <div>
      <form
        className="d-flex flex-column gap-1 fs-4 mb-5"
        onSubmit={handleSubmit}
      >
        <p className="fs-1">{selectedExercise?.exerciseName}</p>

        <input
          name="reps"
          placeholder="Reps"
          value={formData.reps}
          onChange={handleChange}
          required
        />
        <input
          name="weight"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="btn btn-primary fs-4"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>

        {error && <p className="text-danger">Erro: {error.message}</p>}
      </form>

      <GetExercisesStats submittedStats={submittedStats} />
    </div>
  );
};

export default InputsAddExercise;
