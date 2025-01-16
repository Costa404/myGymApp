import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { useAppRoutes } from "./components/Utility/AppRouts";
import LoadingSpinner from "./components/Utility/LoadingSpinner";

const App = () => {
  const router = useAppRoutes(); // Importa as rotas

  return (
    <Suspense
      fallback={
        <div>
          <LoadingSpinner />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
