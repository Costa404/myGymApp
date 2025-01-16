/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import CustomErrorPage from "../../context/errorContext/ErrorRoute.tsx";

const LazyHomepage = lazy(() => import("../Pages/Homepage/Homepage.tsx"));
const LazyMyWorkoutHistory = lazy(
  () => import("../Pages/myWorkoutHistory/MyWorkoutHistory.tsx")
);

export const useAppRoutes = () => {
  return createBrowserRouter(
    [
      {
        path: "/",
        element: <LazyHomepage />,
        errorElement: <CustomErrorPage />,
      },
      {
        path: "/MyWorkoutHistory",
        element: <LazyMyWorkoutHistory />,
        errorElement: <CustomErrorPage />,
      },
    ],
    {
      future: {
        v7_relativeSplatPath: true,
      },
    }
  );
};
