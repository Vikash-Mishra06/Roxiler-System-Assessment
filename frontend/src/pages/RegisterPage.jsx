import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      address: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await api.post(
        "/auth/register",
        formData
      );

      alert(
        "Registration successful"
      );

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={
            handleChange
          }
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={
            handleChange
          }
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={
            handleChange
          }
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={
            handleChange
          }
        />

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;