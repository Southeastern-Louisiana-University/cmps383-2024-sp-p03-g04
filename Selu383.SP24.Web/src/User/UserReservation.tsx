import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './userReservation.css'; 

interface Reservation {
  id: number;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
}

function UserReservation() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    fetch("/api/reservations")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch reservations");
        }
      })
      .then((reservationsData: Reservation[]) => {
        setReservations(reservationsData);
      })
      .catch((error) => {
        console.error("Error fetching reservations:", error);
      });
  }, []);

  return (
    <div className="container"> 
      <h2 className="reservations-section">Your Reservations</h2> 
      <div className="row">
        {reservations.map((reservation, index) => (
          <div key={index} className="col-md-4 mb-4"> 
            <Card className="card-container"> 
              <Card.Img variant="top" src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww" />
              <Card.Body>
                <Card.Title>Reservation {reservation.id}</Card.Title>
                <Card.Text>
                  Check-in Date: {reservation.checkInDate}<br />
                  Check-out Date: {reservation.checkOutDate}<br />
                  Number of Guests: {reservation.numberOfGuests}<br />
                </Card.Text>
                <Button variant="primary">View Details</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserReservation;
