import React, { useState } from "react";
import "./UpdateProfile.css";
import { useUser } from "../Login/UserContext";

const UpdateProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const { user } = useUser();

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`/api/users/update/${user?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username,
        email: email,
      }),
    }).then(async (x) => {
      const resp = await x;
      if (resp.status !== 200) {
        console.log(await resp.text());
      } else {
        console.log("User successfully updated");
      }
    });
  };

  return (
    <>
      <div className="UpdateProfileOrganizer">
        <div>
          <h1>Update Profile</h1>
        </div>
        <form id="UpdateProfile" onSubmit={handleUpdateProfile}>
          <label>
            <b>Username</b>
          </label>
          <input
            type="text"
            id="usernameInput"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>
            <b>Email</b>
          </label>
          <input
            type="text"
            id="emailInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="profileUpdateButton" type="submit">
            <b>Update</b>
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
