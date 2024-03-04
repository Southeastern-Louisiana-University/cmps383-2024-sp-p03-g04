import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../Login/UserContext";
import './navbar.css';

interface NavBarProps {
  brandName: string;
  navItems: string[];
}

function NavBar({ brandName,  navItems }: NavBarProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [collapsed, setCollapsed] = useState(true);
  const { user, setUser } = useUser();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleLogOut = () => {
    console.log("USER LOGGED OUT");

    return fetch("/api/authentication/logout", { method: "POST" }).then(
      async (_x) => setUser(null)
    );
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{background: '#a5b4fc'}}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <span className="fw-bolder fs-4">{brandName}</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
          aria-controls="navbarSupportedContent"
          aria-expanded={!collapsed ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${collapsed ? "" : "show"}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-md-1">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="nav-item"
                onClick={() => setSelectedIndex(index)}
              >
                <Link
                  className={`nav-link ${
                    selectedIndex === index ? "active fw-bold" : ""
                  }`}
                  to={`/${item.toLowerCase()}`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            className="nav-link"
            to={user ? "/Home" : "/Login"}
            onClick={user ? handleLogOut : undefined}
            style={{ marginLeft: "auto", marginRight: "20px" }}
          >
            {user ? "Logout" : "Login"}
          </Link>

          <Link 
          className="nav-link" to={user?"/profile":"/SignUp"}>
          {user ? "Profile" : "SignUp"}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
