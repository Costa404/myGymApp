import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ADD_NEW_USER } from "../../../../Graphql/Mutations/MutationNewUser";

export const useHandleSubmitInputs = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    username: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAccountCreated, setIsAccountCreated] = useState(false);

  // Mutação do GraphQL
  const [addNewUser] = useMutation(ADD_NEW_USER);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.log("Submitting data:", formData);

      const { data } = await addNewUser({
        variables: {
          password: formData.password,
          email: formData.email,
          username: formData.username,
        },
      });

      if (data && data.addNewUser.token) {
        const token = data.addNewUser.token;
        console.log("Token received:", token);

        localStorage.setItem("authToken", token);

        setIsAccountCreated(true);
      }

      setFormData({ password: "", email: "", username: "" });
    } catch (err) {
      console.error("Error adding user:", err);
      setError("Error adding user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    handleChange,
    formData,
    loading,
    error,
    isAccountCreated,
  };
};
