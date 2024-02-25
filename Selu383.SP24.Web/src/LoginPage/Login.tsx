import React, { useState } from "react";
import "./Login.css";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/authentication/login`, {
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
        const responseData = await response.json();
        console.log(responseData);
      } else {
        console.error("Login failed", response.status, response.statusText);
        const errorText = await response.text();
        console.error("Error details:", errorText);
      }
    } catch (error) {
      console.error("Login failed", error);
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
