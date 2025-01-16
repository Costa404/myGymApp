import React, { useState } from "react";
import { LOGIN_USER } from "../../../../Graphql/Mutations/MutationLogin";
import { useMutation } from "@apollo/client";

export const useHandleLogin = () => {
  const [formDataLogin, setFormDataLogin] = useState({
    password: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAccountLogin, setIsAccountLogin] = useState(false);
  const [login] = useMutation(LOGIN_USER);

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.log("Submitting data:", formDataLogin);

      const { data } = await login({
        variables: {
          password: formDataLogin.password,
          email: formDataLogin.email,
        },
      });

      if (data && data.login.token) {
        const token = data.login.token;
        console.log("Token received:", token);

        localStorage.setItem("authToken", token);

        setIsAccountLogin(true);
      }

      setFormDataLogin({ password: "", email: "" });
    } catch (err) {
      console.error("Error adding user:", err);
      setError("Error adding user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    isAccountLogin,
    handleChangeLogin,
    handleSubmit,
  };
};
