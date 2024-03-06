import React, { useEffect, useState } from "react";
import { useUser } from "../Login/UserContext";
import './profile.css';

const Profile: React.FC = () => {
  const { user,setUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/authentication/me")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user data");
        }
      })
      .then((userData) => {
        setUser(userData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="profile-container">
    {loading ? (
      <p>Loading...</p>
    ) : user ? (
      <div>
        <p>Welcome <b>{user.userName}</b> to your profile page! </p>
        <p></p>
      </div>
    ) : (
      <p>No user data available</p>
    )}
  </div>
  );
};

export default Profile;
