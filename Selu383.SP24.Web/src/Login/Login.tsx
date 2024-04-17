import React, { useState } from "react";
import "./Login.css";
import { useUser } from "./UserContext";
import { Slide, toast } from "react-toastify";

interface LoginPageProps {
  onSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  // const navigate = useNavigate();

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
      if (x.status === 200) {
        setUser(responseData);
        // navigate("/");
        toast.success("Successfully LoggedIn", {
          transition: Slide,
        });
        onSuccess();
      }
    });
  };

  return (
    <>
      <div className="LoginOrganizer">
        <h1 className="WelcomeEnstay">Welcome to EnStay</h1>
        <h3>Login to continue</h3>
        <form id="Login" onSubmit={handleLogin}>
          <label className="loginlabel">
            <b>Username</b>
          </label>
          <input
            className="input1"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="loginlabel">
            <b>Password</b>
          </label>
          <input
            className="input1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button1" type="submit">
            <b>Login</b>
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
