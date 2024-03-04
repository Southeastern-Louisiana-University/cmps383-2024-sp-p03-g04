import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp/SignUp.tsx";
import LoginPage from "./Login/Login.tsx";
import Home from "./Home/Home.tsx";
import Reservations from "./Reservations/Reservations.tsx";
import { UserProvider } from "./Login/UserContext.tsx";
import Profile from "./User/Profile.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Reservations" element={<Reservations />} />
        </Route>
      </Routes>
    </UserProvider>
  </BrowserRouter>
);
