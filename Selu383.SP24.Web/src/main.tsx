import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./SignUp/SignUp.tsx";
import LoginPage from "./LoginPage/Login.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/SignUp" element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
