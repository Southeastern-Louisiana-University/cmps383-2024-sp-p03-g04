import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";

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
      roles: ["User"],
    };

    await fetch(`/api/users/customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then(async (x) => {
      const resp = await x;
      if (resp.status !== 200) {
        toast.error(await resp.text(), {
          transition: Slide,
        });
      } else {
        navigate("/");
        onSuccess();
        toast.success("User successfully registered", {
          transition: Slide,
        });
      }
    });
  };

  return (
    <>
      <div className="SignupOrganizer">
        <h1 className="WelcomeEnstay">Welcome to EnStay</h1>
        <form id="Signup" onSubmit={handleSignup}>
          <label>
            <b>First Name</b>
          </label>
          <input
            className="input1"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>
            <b>Last Name</b>
          </label>
          <input
            className="input1"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>
            <b>Phone Number</b>
          </label>
          <input
            className="input1"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>
            <b>Email</b>
          </label>
          <input
            className="input1"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>
            <b>Username</b>
          </label>
          <input
            className="input1"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>
            <b>Password</b>
          </label>
          <input
            className="input1"
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
