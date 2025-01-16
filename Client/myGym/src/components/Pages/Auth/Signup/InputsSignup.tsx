import { useModalStore } from "../../../Utility/useModalStore";

import ReactDOM from "react-dom";
import { useHandleSubmitInputs } from "./HandleSubmitInputs";

const InputsSignup = () => {
  const { handleChange, handleSubmit, loading, isAccountCreated } =
    useHandleSubmitInputs();

  const { closeModalSignup } = useModalStore();

  return ReactDOM.createPortal(
    <div className="modal-overlay  fs-3  h-100 w-100 ">
      <div className="modal-content modal-signup d-flex flex-column  border border-dark w-25 justify-content-center  align-items-center  mainModalMobile bg-black inputsAuth">
        {!isAccountCreated ? (
          <>
            <p className="fs-1">Create Account</p>
            <form
              onSubmit={handleSubmit}
              className="d-flex flex-column gap-2  w-100  justify-content-center align-items-center"
            >
              <input
                className="w-100"
                name="email"
                type="text"
                placeholder="Email"
                required
                onChange={handleChange}
              />
              <input
                className="w-100"
                name="password"
                type="password"
                placeholder="Password"
                required
                onChange={handleChange}
              />
              <input
                className="w-100"
                name="username"
                type="text"
                placeholder="User Name"
                required
                onChange={handleChange}
              />

              <button
                className="fs-3 btn border border-dark btn-primary hover w-100 mt-3"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
              <div className="d-flex gap-2 mt-3">
                <h4 className="fw-semibold text-light">
                  Already have an account?
                </h4>
                <h4 className="text-primary">Log in</h4>
              </div>
              <button
                onClick={closeModalSignup}
                type="button"
                className="btn fs-3 btn-danger w-100 mt-3"
              >
                Close
              </button>
            </form>
          </>
        ) : (
          <div className="text-center ">
            <h2 className="text-success">Account Created Successfully!</h2>

            <button
              onClick={closeModalSignup}
              type="button"
              className="btn fs-3 btn-primary w-50 mt-4"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>,
    document.getElementById("modal-Signup")!
  );
};

export default InputsSignup;
