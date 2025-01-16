import InputsSignup from "./InputsSignup";
import { useModalStore } from "../../../Utility/useModalStore";

const Signup = () => {
  const { isModalSignUp } = useModalStore();

  return (
    <div className=" w-100 h-100">
      {/* <button className="btn btn-primary" onClick={() => navigate("/")}>
        Homepage
      </button> */}
      {isModalSignUp ? <InputsSignup /> : null}
    </div>
  );
};

export default Signup;
