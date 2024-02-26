import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

interface UserDto {
	userName?: string;
	id?: number;
}

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState<UserDto | null>(null);
  const { setUser } = useUser(); // Use the useUser hook here


  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    
      const response = await fetch(`/api/authentication/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          password: password,
        }),
      }).then(async x=>{
        const responseData = await x.json();
        if(x.status ==200){
          setUser(responseData);
          navigate('/');
        }
      })

      // if (response.ok) {
      //   const responseData = await response.json();
      //   console.log(responseData);
      //   navigate("/Home");
      // } else {
      //   console.error("Login failed", response.status, response.statusText);
      //   const errorText = await response.text();
      //   console.error("Error details:", errorText);
      // }
   
  };
  useEffect(() => {
    fetch("/api/authentication/me").then(async (x) =>{
      x.json().then((userResp) => setUser(userResp))
    });
  }, [])

  return (
    <>
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
    </>
  );
};

export default LoginPage;
