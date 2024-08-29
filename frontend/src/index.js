import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import NoteState from "./context/notes/NoteState";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    {" "}
    {/* Wrap the whole app with BrowserRouter */}
    <NoteState>
      <App />
    </NoteState>
  </BrowserRouter>
);

reportWebVitals();
