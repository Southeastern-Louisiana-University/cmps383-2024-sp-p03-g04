import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

interface CreateUserDto {
  userName: string;
  password: string;
  email: string;
  roles: string[];
}

interface SignupPageProps {
  onSuccess: () => void; 
}

const SignupPage: React.FC<SignupPageProps> = ({ onSuccess }) => {
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
      roles: ["Customer"], 
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
        console.log(responseData);
        console.log(response);
        navigate("/");
        onSuccess(); 
      } else {
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
          <label><b>Email</b></label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label><b>Username</b></label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label><b>Password</b></label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button1" type="submit">
            <b>Sign up</b>
          </button>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
