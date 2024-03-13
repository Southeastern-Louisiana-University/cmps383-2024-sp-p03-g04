import React from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "./booking.css";

const Booking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotel, checkInDate, checkOutDate, guests, roomType, room } = location.state;

  {/*const getReservations = async () => {
    const response = await fetch(`/api/reservation`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    
      const hotelData = await response.json();
    setHotels(hotelData);

     useEffect(() => {
    getHotels();
  }, [searchQuery]);

  const handleSearch = () => {
    getHotels();
  };

  const handleViewRooms = (hotel: Hotel) => {
    console.log("🚀 ~ handleViewRooms ~ hotel:", hotel);
    navigate("/reservations/rooms", {
      state: { hotel, checkInDate, checkOutDate, guests, roomType, room },
    });
  };
    
  */}

  const handleBooking = () => {
    navigate("/reservations/rooms/booking", {
      state: {
        hotel,
        checkInDate,
        checkOutDate,
        guests,
        roomType,
        room,
        hotelId: hotel.id
      }
    });
  };

  return (
    <Container>
      <div className="booking-form-container"> 
        <h1>Booking</h1>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="comments">Comments:</label>
          <textarea id="comments" name="comments" rows={4}></textarea>
        </div>
        <div className="form-group">
          <button onClick={handleBooking} className="btn btn-primary">Confirm Booking</button>
        </div>
      </div>
    </Container>
  );
};

export default Booking;
