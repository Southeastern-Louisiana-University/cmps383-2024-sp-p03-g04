import React, { useState } from "react";
import "./Login.css";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const BASE_URL = "http://localhost:5000"; // Adjust this to match your frontend URL

      const response = await fetch(`${BASE_URL}/api/authentication/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          password: password,
        }),
      });

      if (response.ok) {
        // Login successful, handle the success (redirect or update state)
        console.log("Login successful");
      } else {
        // Login failed, handle the failure (display error message, etc.)
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred during login", error);
    }
  };

  return (
    <div id="LoginOrganizer">
      <h1 id="WelcomeEnstay">Welcome to EnStay</h1>
      <h2>Login to continue</h2>
      <form id="Login" onSubmit={handleLogin}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
