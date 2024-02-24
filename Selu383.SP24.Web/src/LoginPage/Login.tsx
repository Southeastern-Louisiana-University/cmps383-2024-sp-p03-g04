import React from "react";
import "./Login.css";

const LoginPage: React.FC = () => {
  return (
    <div id="LoginOrganizer">
      <h1 id="WelcomeEnstay">Welcome to EnStay</h1>
      <h2>Login to continue</h2>
      <form id="Login">
        <label>Username</label>
        <input type="text" />
        <label>Password</label>
        <input type="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
