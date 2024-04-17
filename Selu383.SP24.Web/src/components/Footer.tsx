import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-guest-info">
          <h5 className="footer-title">Guest Information</h5>
          <Link to="/about" className="footer-link">
            Why EnStay
          </Link>
          <br />

          <Link to="/services" className="footer-link">
            Locations
          </Link>
        </div>

        <div className="footer-contact">
          <h5 className="footer-title">Contact Us</h5>
          <p>Reservations: 1-985-1111-1111</p>
          <p>Email: enstay@selu.edu</p>
        </div>

        <div className="footer-icon">
          <h5 className="footer-title">Follow Us</h5>
          <div className="footer-social">
            <i
              className="fab fa-facebook-square"
              style={{ color: "#1877f2" }}
            ></i>
            <i
              className="fab fa-instagram-square"
              style={{ color: "#c13584" }}
            ></i>
            <i
              className="fab fa-youtube-square"
              style={{ color: "#ff0000" }}
            ></i>

            <i className="fab fa-tiktok" style={{ color: "#000000" }}></i>
          </div>
        </div>
      </div>
      <div className="footer-copyright">&copy; 2024 EnStay Suites</div>
    </footer>
  );
};

export default Footer;
