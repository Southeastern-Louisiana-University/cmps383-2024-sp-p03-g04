import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/all.css";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useUser } from "./Login/UserContext";

function App() {
  const { user, setUser } = useUser();

  useEffect(() => {
    fetch("/api/authentication/me").then(async (x) => {
      x.json().then((userResp) => setUser(userResp));
    });
  }, [setUser]);

  const isAdmin = () => {
    // Assuming user object has an isAdmin property
    return user && user.roles.includes("Admin" || "admin");
  };

  const items = ["Services", "Rooms", "About", "Contact"];
  if (isAdmin()) {
    items.push("Admin");
  }
  return (
    <>
      <div className="app-container">
        <NavBar brandName={"EnStay"} navItems={items} />
      </div>
      <div className="content-organizer">
        <div className="content-container">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
