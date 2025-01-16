import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ApolloProvider } from "@apollo/client";

import { SelectedExerciseProvider } from "./context/useSelectedExercise.tsx";
import { ThemeProvider } from "./context/ThemeContext/ThemeContext.tsx";
import client from "./SocketioConfig.tsx";
import { WorkoutProvider } from "./context/useWorkoutId.tsx";
import { CurrentUserProvider } from "./context/useCurrentUserAuth.tsx";
import { ErrorProvider } from "./context/errorContext/useError.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider>
        <ErrorProvider>
          <CurrentUserProvider>
            <WorkoutProvider>
              <SelectedExerciseProvider>
                <App />
              </SelectedExerciseProvider>
            </WorkoutProvider>
          </CurrentUserProvider>
        </ErrorProvider>
      </ThemeProvider>
    </ApolloProvider>
  </StrictMode>
);
