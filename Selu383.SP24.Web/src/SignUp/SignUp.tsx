import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

interface CreateUserDto {
  userName: string;
  password: string;
  email: string;
  roles: string[];
}

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: CreateUserDto = {
      userName: username,
      password: password,
      email: email,
      roles: ["Customer"], // or provide the necessary roles
    };

    const response = await fetch(`/api/users/customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then(async (x) => {
      const responseData = await x.json();
      if (x.status === 200) {
        // Optionally handle success
        console.log(responseData);
        console.log(response);
        navigate("/");
      } else {
        // Optionally handle errors
        console.error("Signup failed", x.status, x.statusText);
      }
    });
  };

  return (
    <>
      <div className="SignupOrganizer">
        <h1 className="WelcomeEnstay">Welcome to EnStay</h1>
        <h3>Sign up to create an account</h3>
        <form id="Signup" onSubmit={handleSignup}>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
          <button type="submit">Sign up</button>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
