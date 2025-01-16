type GetExercisesStatsProps = {
  submittedStats:
    | { reps: string; weight: string; exerciseName: string }[]
    | null;
};

const GetExercisesStats = ({ submittedStats }: GetExercisesStatsProps) => {
  if (!submittedStats) {
    return;
  }

  return (
    <>
      {submittedStats.map((stat, index) => (
        <div className="mt-3 d-flex justify-content-between" key={index}>
          <h3>{stat.exerciseName}</h3>
          <h3>
            <strong>Reps:</strong> {stat.reps}
          </h3>
          <h3>
            <strong>Weight:</strong> {stat.weight} kg
          </h3>
        </div>
      ))}
    </>
  );
};

export default GetExercisesStats;
