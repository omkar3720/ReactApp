import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const onLogin = (formData) => {
    setData(formData);
    navigate(`/login/${formData.username}/${formData.password}`);
  };

  return (
    <div className="container mt-5 ">
      <h1 className="text-center mb-4">Login Here</h1>
      <form
        onSubmit={handleSubmit(onLogin)}
        className="w-50 mx-auto border p-4 shadow rounded bg-white"
      >
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Enter Username:
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            {...register("username")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Enter Password:
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            {...register("password")}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
