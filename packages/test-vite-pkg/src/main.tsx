import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./resource/style/index.css";
import App from "./component/app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
