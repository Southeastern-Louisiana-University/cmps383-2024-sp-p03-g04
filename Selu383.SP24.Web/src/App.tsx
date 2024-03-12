import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/all.css";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";
//import imagePath from "./images/logo.png";
import { useEffect } from "react";
import { useUser } from "./Login/UserContext";

function App() {
  const { setUser } = useUser(); // Use the useUser hook here

  useEffect(() => {
    fetch("/api/authentication/me").then(async (x) => {
      x.json().then((userResp) => setUser(userResp));
    });
  }, []);

  let items = ["Book a Room", "About", "Services", "Rooms", "Contact"];
  return (
    <>
      <div className="app-container">
        <NavBar brandName={"EnStay"} navItems={items} />
      </div>
      <div className="content-container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
