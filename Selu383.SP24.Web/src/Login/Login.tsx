import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import { Slide, toast } from "react-toastify";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser(); // Use the useUser hook here
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`/api/authentication/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username,
        password: password,
      }),
    }).then(async (x) => {
      const responseData = await x.json();
      if (x.status == 200) {
        setUser(responseData);
        navigate("/");
        toast.success('Successfully LoggedIn'),{
          transition: Slide
        };
      }
    });
  };

  return (
    <>
      <div className="LoginOrganizer">
        <h1 className="WelcomeEnstay">Welcome to EnStay</h1>
        <h3>Login to continue</h3>
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
          <button className="button1" type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
