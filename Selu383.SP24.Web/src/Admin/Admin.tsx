/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useUser } from "../Login/UserContext";

const Admin: React.FC = () => {
  const [hotels, setHotels] = useState([]);
  const { setUser } = useUser();

  type Reservation = {
    HotelId: number;
    GuestId: number;
    RoomId: number;
    CheckInDate: string;
    CheckOutDate: string;
    NumberOfGuests: number;
    IsPaid: boolean;
    ConfirmationNumber: string;
  };

  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    fetch("/api/authentication/me").then(async (x) => {
      x.json().then((userResp) => {
        setUser(userResp);
        const fetchHotels = async () => {
          const response = await fetch(`/api/hotels/manager/${userResp.id}`);
          if (response.ok) {
            const data = await response.json();
            setHotels(data);
            console.log(data);

            // Collect all reservations in a single array
            const allReservations: Reservation[] = [];

            // Fetch reservations for each hotel
            for (const hotel of data) {
              const resResponse = await fetch(
                `/api/reservations/hotel/${hotel.id}`
              );
              if (resResponse.ok) {
                const resData: Reservation[] = await resResponse.json();
                allReservations.push(...resData);
              } else {
                console.log("Failed to fetch reservations for hotel", hotel.id);
              }
            }

            // Set all reservations at once
            setReservations(allReservations);
          } else {
            console.log("Failed to fetch hotels");
          }
        };

        fetchHotels();
      });
    });
  }, []);

  return (
    <>
      <h1>Admin Dashboard</h1>
      <div className="AdminOrganizer">
        <div className="AdminHotelList">
          <h2>My Hotels</h2>
          {hotels.map((hotel: { id: number; name: string }) => (
            <div key={hotel.id}>{hotel.name}</div>
          ))}
          <h2>Reservations</h2>
          {reservations.map((reservation: Reservation) => {
            console.log(reservation.CheckInDate, reservation.CheckOutDate); // Log the dates to the console

            return (
              <div key={reservation.ConfirmationNumber}>
                <h3>Reservation for hotel {reservation.HotelId}</h3>
                <p>Guest ID: {reservation.GuestId}</p>
                <p>Room ID: {reservation.RoomId}</p>
                <p>
                  Check In Date:{" "}
                  {new Date(reservation.CheckInDate).toLocaleDateString()}
                </p>
                <p>
                  Check Out Date:{" "}
                  {new Date(reservation.CheckOutDate).toLocaleDateString()}
                </p>
                <p>Number of Guests: {reservation.NumberOfGuests}</p>
                <p>Is Paid: {reservation.IsPaid ? "Yes" : "No"}</p>
                <p>Confirmation Number: {reservation.ConfirmationNumber}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Admin;
