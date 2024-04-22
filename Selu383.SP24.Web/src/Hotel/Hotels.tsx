import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../Utils/dateUtils";

interface Hotel {
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

const Reservations: React.FC = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const { hotel, checkInDate, checkOutDate, guests, selectedHotel, roomType } =
    location.state || {};

  const initialHotels: Hotel[] = hotel ? hotel : [];
  const [hotels, setHotels] = useState<Hotel[]>(initialHotels);
  const [searchQuery] = useState("");

  const getHotels = async () => {
    let hotelData;
    if (!selectedHotel) {
      const response = await fetch(`/api/hotels`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      hotelData = await response.json();
      setHotels(hotelData);
    } else {
      const response = await fetch(`/api/hotels/${selectedHotel}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const singleHotelData = await response.json();
      hotelData = [singleHotelData];
      setHotels(hotelData);
    }
  };

  useEffect(() => {
    getHotels();
  }, [searchQuery]);

  const handleViewRooms = (hotel: Hotel) => {
    navigate("/reservations/rooms", {
      state: {
        hotel,
        checkInDate,
        checkOutDate: formatDate(checkOutDate),
        guests,
        roomType,
      },
    });
  };

  return (
    <Container fluid style={{ width: "80%" }}>
      <br></br>
      {hotels.map((hotel, index) => (
        <Col key={index} xs={12}>
          <Card className="mb-3" style={{ maxWidth: "100%" }}>
            <Row className="g-0">
              <Col md={3}>
                <Card.Img
                  variant="top"
                  src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg"
                />
              </Col>
              <Col md={9}>
                <Card.Body>
                  <Card.Title style={{ fontSize: "30px", fontWeight: "700" }}>
                    {hotel.name}
                  </Card.Title>
                  <Card.Text>
                    <small className="text-muted">Recently remodeled </small>
                  </Card.Text>
                  <Card.Text>
                    <strong>Address:</strong> {hotel.streetAddress}
                    {", "}
                    {hotel.city}
                    {", "}
                    {hotel.state}
                    {", "}
                    {hotel.zipCode}
                    <br />
                    <strong>Amenities:</strong> Free WIFI, Breakfast,
                    Minifridge, Microwave
                  </Card.Text>

                  <button
                    type="button"
                    className="btn btn-success"
                    style={{ marginLeft: "70%" }}
                    onClick={() => handleViewRooms(hotel)}
                  >
                    View Available Rooms
                  </button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </Container>
  );
};

export default Reservations;
