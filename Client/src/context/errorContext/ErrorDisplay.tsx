import React from "react";
import { useError } from "./useError";

const ErrorDisplay: React.FC = () => {
  const { error } = useError();

  return error ? (
    <p
      style={{
        position: "absolute",

        color: "red",

        borderRadius: "5px",
        fontSize: "1.2rem",
        display: "flex",
        justifyContent: "center",
        fontWeight: "600",
        opacity: "1",
        transition: "opacity 2s ease-out",
      }}
    >
      {error}
    </p>
  ) : null;
};

export default ErrorDisplay;
