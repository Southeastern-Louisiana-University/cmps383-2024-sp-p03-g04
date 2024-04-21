import { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useUser } from "../Login/UserContext";
import { Slide, toast } from "react-toastify";
import LoginModal from "../Login/LoginModal";
import SignupModal from "../SignUp/SignupModal";
import "./navbar.css";

interface NavBarProps {
  brandName: string;
  navItems: string[];
}

function NavBar({ brandName, navItems }: NavBarProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [collapsed, setCollapsed] = useState(true);
  const { user, setUser } = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleLogOut = () => {
    return fetch("/api/authentication/logout", { method: "POST" }).then(
      async (_x) => {
        setUser(null);
        toast.success("Successfully Logged Out", {
          transition: Slide,
        });
      }
    );
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ background: "#a5b4fc" }}>
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
          {user ? (
            <>
              <div className="dropdown-container">
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    className="btn btn-outline-light custom-dropdown-toggle"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "#fff",
                      color: "#fff",
                    }}
                  >
                    {user.userName}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile/userinfo">
                      Profile
                    </Dropdown.Item>

                    <Dropdown.Item as={Link} to="/userReservation">
                      Reservations
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <Link
                className="btn btn-outline-light"
                to="/Home"
                onClick={handleLogOut}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <button
                className="btn btn-outline-light"
                onClick={() => setShowLoginModal(true)}
                style={{ marginLeft: "auto", marginRight: "20px" }}
              >
                Login
              </button>
              <button
                className="btn btn-outline-light"
                onClick={() => setShowSignupModal(true)}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
      />
      <SignupModal
        show={showSignupModal}
        onHide={() => setShowSignupModal(false)}
      />
    </nav>
  );
}

export default NavBar;
