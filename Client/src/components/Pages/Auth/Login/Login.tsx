import { useModalStore } from "../../../Utility/useModalStore";
import InputsLogin from "./InputsLogin";

const Login = () => {
  const { isModalLogin } = useModalStore();

  return (
    <div className=" w-100 h-100">
      {/* <button className="btn btn-primary" onClick={() => navigate("/")}>
        Homepage
      </button> */}
      {isModalLogin ? <InputsLogin /> : null}
    </div>
  );
};

export default Login;
