import React, { useState } from "react";
import { useModalStore } from "../../../Utility/useModalStore";
import ReactDOM from "react-dom";
import { useHandleLogin } from "./useHandleLogin";
import ErrorDisplay from "../../../../context/errorContext/ErrorDisplay";

const InputsLogin = () => {
  const { closeModalLogin } = useModalStore();

  const {
    handleSubmit: handleLoginSubmit,
    loading,
    isAccountLogin,
  } = useHandleLogin();

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await handleLoginSubmit(e);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Login Error:", err);

        if (err.message === "auth/wrong-password") {
          setError("Incorrect password. Please try again.");
        } else if (err.message === "auth/user-not-found") {
          setError("User not found.");
        } else {
          setError("Error attempting to log in. Please try again later.");
        }
      } else {
        setError("Unexpected error.");
      }
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay fs-3 h-100 w-100">
      <div className="modal-content modal-signup d-flex flex-column border border-dark w-25 justify-content-center align-items-center mainModalMobile bg-black inputsAuth">
        {!isAccountLogin ? (
          <>
            <p className="fs-1">Login</p>
            <form
              onSubmit={handleSubmit}
              className="d-flex flex-column gap-2 w-100 justify-content-center align-items-center"
            >
              <div style={{ minHeight: "30px" }}>
                {error && <p className="text-danger fs-5">{error}</p>}
              </div>

              <input
                className="w-100"
                name="email"
                type="text"
                placeholder="Email"
                required
                onChange={(e) => console.log(e.target.value)}
              />
              <ErrorDisplay />

              <input
                className="w-100"
                name="password"
                type="password"
                placeholder="Password"
                required
                onChange={(e) => console.log(e.target.value)}
              />

              <button
                className="fs-3 btn border border-dark btn-primary hover w-100 mt-3"
                disabled={loading}
              >
                {loading ? "Logging ..." : "Login"}
              </button>

              <button
                onClick={closeModalLogin}
                type="button"
                className="btn fs-3 btn-danger w-100 mt-3"
              >
                Close
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-success">Login Successfully!</h2>

            <button
              onClick={closeModalLogin}
              type="button"
              className="btn fs-3 btn-primary w-50 mt-4"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>,
    document.getElementById("modal-Login")!
  );
};

export default InputsLogin;
