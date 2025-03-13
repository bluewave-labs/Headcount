import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PageProvider } from "./context/PageContext";
import StepContext from "./context/stepContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PageProvider>
        <StepContext>
          <App />
        </StepContext>
      </PageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
