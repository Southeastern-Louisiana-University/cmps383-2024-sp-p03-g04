import "./App.css";
import {

  Outlet,
  // useLocation,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import 'react-toastify/dist/ReactToastify.css';

import imagePath from "./images/logo.png";
import { useEffect } from "react";
import { useUser } from "./Login/UserContext";
//import Home from "./Home/Home";
//import { useState } from "react";

function App() {

  const { setUser } = useUser(); // Use the useUser hook here

  useEffect(() => {
    fetch("/api/authentication/me").then(async (x) =>{
      x.json().then((userResp) => setUser(userResp))
    });
  }, [])

  let items = ["Home", "About", "Services", "Rooms", "Gallery", "Contact"];

  //Note for Shreeza: I have made a temp navbar while i was working because i'm not familiar with bootstrap framework
  //and couldn't figure out how to make it the full width of the screen, feel free to change it to the
  //navbar you made if you can get it to be the full width of the screen
  // -Kade

  return (
    <>
      <div className="app-container">
        <NavBar
          brandName={"EnStay"}
          imageSrcPath={imagePath}
          navItems={items}
        />
      </div>
      <div className="content-container">
        <Outlet />
      </div>
      <footer className="footer">
        <p>&copy; 2024 EnStay Suites</p>
      </footer>
    </>
  );
}

export default App;
