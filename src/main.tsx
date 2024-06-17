/* eslint-disable @typescript-eslint/no-misused-promises */
import CssBaseline from "@mui/material/CssBaseline";
import App from "App";
import React from "react";
import ReactDOM from "react-dom/client";
import { useForm } from "react-hook-form";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("No root element found.");

const reactRoot = ReactDOM.createRoot(rootElement);

const Test = () => {
  const { handleSubmit, register } = useForm();

  return (
    <form
      onSubmit={handleSubmit(() => {
        console.log("meow");
      })}
    >
      <input
        {...register("firstName", { required: true })}
        placeholder="First name"
      />

      <input
        {...register("lastName", { minLength: 2 })}
        placeholder="Last name"
      />

      <select {...register("category")}>
        <option value="">Select...</option>
        <option value="A">Category A</option>
        <option value="B">Category B</option>
      </select>

      <input {...register("checkbox")} type="checkbox" value="A" />
      <input {...register("checkbox")} type="checkbox" value="B" />
      <input {...register("checkbox")} type="checkbox" value="C" />

      <input {...register("radio")} type="radio" value="A" />
      <input {...register("radio")} type="radio" value="B" />
      <input {...register("radio")} type="radio" value="C" />

      <input type="submit" />
    </form>
  );
};

reactRoot.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
    {/* <Test /> */}
  </React.StrictMode>,
);
