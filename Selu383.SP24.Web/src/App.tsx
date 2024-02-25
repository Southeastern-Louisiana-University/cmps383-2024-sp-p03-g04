import "./App.css";
import { BrowserRouter, Link, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="app-container">
        <nav className="top-nav">
          <h1>EnStay Suites</h1>
          <div className="PageLinks">
            <Link to="/Login">Login</Link>
            <Link to="/SignUp">Sign Up</Link>
          </div>
        </nav>
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
