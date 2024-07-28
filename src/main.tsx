import CssBaseline from "@mui/material/CssBaseline";
import App from "App";
import React from "react";
import ReactDOM from "react-dom/client";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("No root element found.");

const reactRoot = ReactDOM.createRoot(rootElement);

reactRoot.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
);
