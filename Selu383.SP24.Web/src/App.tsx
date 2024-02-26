import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import imagePath from "./images/logo.png";
import Home from "./Home/Home";
import { useState } from "react";

function LoginNavBar() {
  return (
    <div className="top-nav">
      <div className="logo-name">
        <img id="logoImage" src={imagePath} alt="EnStay Suites" />
        <h1>EnStay Suites</h1>
      </div>
      <div className="PageLinks">
        <Link to="/Login">Login</Link>
        <Link to="/SignUp">Sign Up</Link>
      </div>
    </div>
  );
}

function RegNavBar() {
  return (
    <div className="top-nav">
      <div className="logo-name">
        <img id="logoImage" src={imagePath} alt="EnStay Suites" />
        <h1>EnStay Suites</h1>
      </div>
      <div className="PageLinksReg">
        <Link to="/Home">Home</Link>
        <Link to="/Reservations">Reservations</Link>
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();

  //need to create a better isloggedIn const which tracks the login of the user.
  // const isLoggedIn =
  //   location.pathname === "/Login" || location.pathname === "/SignUp";

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
