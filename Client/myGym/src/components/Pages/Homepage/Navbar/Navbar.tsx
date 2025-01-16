import { CgGym } from "react-icons/cg";

import { useNavigate } from "react-router-dom";
import { useModalStore } from "../../../Utility/useModalStore";

import { useEffect, useState } from "react";
import GET_USERNAME from "../../../../Graphql/Querys/GetUsername";
import { useQuery } from "@apollo/client";
import LoadingSpinner from "../../../Utility/LoadingSpinner";

const Navbar = () => {
  const navigate = useNavigate();
  const { loading, data } = useQuery(GET_USERNAME);

  const handleNavigateWorkout = () => {
    navigate("/MyWorkoutHistory");
  };

  const { openModalSignup, openModalLogin } = useModalStore();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, [localStorage.getItem("authToken")]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    console.log("Token removido. Status do localStorage:", localStorage);
  };

  if (loading) {
    return (
      <p>
        <LoadingSpinner />
      </p>
    );
  }
  // if (error) {
  //   return <p>error</p>;
  // }

  // if (error) {
  //   return <p>Erro ao carregar os dados: {error.message}</p>;
  // }

  return (
    <section className="border-bottom border-dark w-100">
      <div
        className="w-100   d-flex justify-content-between align-items-center  navbarMobile"
        style={{ height: "8rem", paddingLeft: "15%", paddingRight: "15%" }}
      >
        <div className="d-flex gap-3 align-items-center">
          {" "}
          <CgGym className="fs-1" />{" "}
          <h1 className="fs-3 titleMyGymMobile">myGym</h1>
        </div>
        <div className="d-flex  gap-3">
          <span
            className="d-flex align-items-center  gap-4 fs-4"
            style={{ listStyle: "none" }}
          >
            <li className="hover" onClick={handleNavigateWorkout}>
              myHistory
            </li>
            {/* <li>Program</li>
            <li>Pricing</li>
            <li>Communnity</li> */}
          </span>
          <div
            className="d-flex
          gap-3"
          >
            {isAuthenticated ? (
              <>
                {" "}
                <span>
                  <button
                    className="p-2 fw-semibold fs-4  btn btn-danger hover"
                    disabled={!isAuthenticated}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </span>
                <h1>{data?.GetUsername?.username}</h1>
              </>
            ) : (
              <>
                <span>
                  <button
                    onClick={openModalLogin}
                    className="p-2 fw-semibold fs-4 btn btn-primary"
                  >
                    Login
                  </button>
                </span>
                <span>
                  <button
                    onClick={openModalSignup}
                    className="p-2 fw-semibold fs-4 btn btn-primary hover"
                  >
                    Register
                  </button>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
