import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./userReservation.css";
import { useUser } from "../Login/UserContext";
import { Dropdown } from "react-bootstrap";

interface Reservation {
  id: number;
  guestId: number;
  hotelId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  confirmationNumber: string;
}

function UserReservation() {
  const { user } = useUser();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [filterName, setFilterName] = useState("All Reservations");
  const formatDate = (dateString: string | number) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = dayNames[date.getDay()];
    return `${year} ${month} ${day} ${dayOfWeek}`;
  };

  function getHotelName(hotelId: number): string {
    const hotelNames: { [key: number]: string } = {
      1: "EnStay Baronne",
      2: "EnStay Esplanade",
      3: "EnStay Convention",
    };
    return hotelNames[hotelId];
  }

  useEffect(() => {
    const fetchReservations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/reservations/user/${user?.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch reservations");
        }
        const reservationsData: Reservation[] = await response.json();

        setReservations(reservationsData);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
      setIsLoading(false);
    };

    fetchReservations();
  }, [user]);

  const filteredReservations = reservations.filter((reservation) => {
    const checkInDate = new Date(reservation.checkInDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (filter) {
      case "today":
        return (
          checkInDate.getFullYear() === today.getFullYear() &&
          checkInDate.getMonth() === today.getMonth() &&
          checkInDate.getDate() === today.getDate()
        );
      case "future":
        return (
          checkInDate.getFullYear() > today.getFullYear() ||
          (checkInDate.getFullYear() === today.getFullYear() &&
            checkInDate.getMonth() > today.getMonth()) ||
          (checkInDate.getFullYear() === today.getFullYear() &&
            checkInDate.getMonth() === today.getMonth() &&
            checkInDate.getDate() > today.getDate())
        );
      default:
        return true;
    }
  });

  return (
    <div className="container">
      <h2 className="reservations-section">Your Reservations</h2>
      <div className="row">
        <Dropdown
          className="d-flex justify-content-end"
          onSelect={(selectedKey: string | null) => {
            setFilter(selectedKey ?? "all");
            switch (selectedKey) {
              case "today":
                setFilterName("Today's Reservations");
                break;
              case "future":
                setFilterName("Future Reservations");
                break;
              default:
                setFilterName("All Reservations");
            }
          }}
        >
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {filterName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="all">All Reservations</Dropdown.Item>
            <Dropdown.Item eventKey="today">Today's Reservations</Dropdown.Item>
            <Dropdown.Item eventKey="future">Future Reservations</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          filteredReservations.map((reservation, index) => (
            <div key={index} className="col-md-4 mb-4">
              <Card className="card-container">
                <Card.Img
                  variant="top"
                  src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww"
                />
                <Card.Body>
                  <Card.Title>
                    Reservation at {getHotelName(reservation.hotelId)}
                  </Card.Title>
                  <Card.Text>
                    Check-in Date: {formatDate(reservation.checkInDate)}
                    <br />
                    Check-out Date: {formatDate(reservation.checkOutDate)}
                    <br />
                    Number of Guests: {reservation.numberOfGuests}
                    <br />
                    Confirmation Number : {reservation.confirmationNumber}
                  </Card.Text>
                  <Button variant="primary">View Details</Button>
                </Card.Body>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserReservation;
