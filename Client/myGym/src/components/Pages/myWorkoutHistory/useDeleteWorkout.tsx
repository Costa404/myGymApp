import { useMutation } from "@apollo/client";
import { DELETE_WORKOUT } from "../../../Graphql/Mutations/MutationAddWorkoutStats";
import LoadingSpinner from "../../Utility/LoadingSpinner";

interface UseDeleteWorkout {
  handleDelete: ({ id }: { id: string }) => Promise<void>;
}

export const useDeleteWorkout = (): UseDeleteWorkout => {
  const [deleteWorkout, { loading, error }] = useMutation(DELETE_WORKOUT);

  if (loading) {
    <p>
      <LoadingSpinner />
    </p>;
  }
  if (error) {
    <p>error</p>;
  }

  const handleDelete = async ({ id }: { id: string }) => {
    console.log("id", id);
    console.log(typeof id);

    if (window.confirm("Are you sure you want to delete this workout?")) {
      try {
        console.log("Sending ID to Apollo:", id.toString());
        const { data: workoutData } = await deleteWorkout({
          variables: { deleteWorkoutId: String(id) },
        });

        console.log("Response from Apollo:", workoutData);
      } catch (err) {
        console.error("Error deleting workout:", err);
      }
    }
  };

  return { handleDelete };
};
