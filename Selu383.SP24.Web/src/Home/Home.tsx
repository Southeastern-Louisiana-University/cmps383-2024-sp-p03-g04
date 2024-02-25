import React from "react";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="home">
      <h1>Welcome to My Website</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <img src="dummy-image.jpg" alt="Dummy Image" />
    </div>
  );
};

export default Home;
