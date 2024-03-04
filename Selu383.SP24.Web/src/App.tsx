import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/all.css";
import Footer from "./components/Footer";

function App() {
  let items = ["Home", "About", "Services", "Rooms", "Gallery", "Contact"];
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
