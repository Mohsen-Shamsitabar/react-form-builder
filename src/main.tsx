import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("No root element found.");

const reactRoot = ReactDOM.createRoot(rootElement);

reactRoot.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
);
