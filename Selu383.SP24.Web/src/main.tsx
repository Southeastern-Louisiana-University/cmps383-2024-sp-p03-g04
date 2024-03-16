import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp/SignUp.tsx";
import LoginPage from "./Login/Login.tsx";
import Home from "./Home/Home.tsx";
import Reservations from "./Reservations/Reservations.tsx";
import { UserProvider } from "./Login/UserContext.tsx";
import { ToastContainer } from "react-toastify";
import Rooms from "./Rooms/Rooms.tsx";
import UserInfo from "./User/UserInfo.tsx";
import UpdateProfile from "./User/UpdateProfile.tsx";
import UserReservation from "./User/UserReservation.tsx";
import Booking from "./Reservations/Booking.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      theme="colored"
      hideProgressBar={true}
      closeOnClick={true}
    />
    <UserProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/Login" element={<LoginPage onSuccess={function (): void {
            throw new Error("Function not implemented.");
          } } />} />
          <Route path="/SignUp" element={<SignUp onSuccess={function (): void {
            throw new Error("Function not implemented.");
          } } />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/userReservation" element={<UserReservation />} />
          <Route path="/Reservations" element={<Reservations />} />
          <Route path="/reservations/rooms" element={<Rooms/>} />
          <Route path="/profile/userinfo" element={<UserInfo />} />
          <Route path="/profile/update" element={<UpdateProfile />} />
          <Route path="/reservations/rooms/booking" element={<Booking/>} />

        </Route>
      </Routes>
    </UserProvider>
  </BrowserRouter>
);
