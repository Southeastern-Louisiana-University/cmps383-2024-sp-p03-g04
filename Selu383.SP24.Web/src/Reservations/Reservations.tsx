import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

interface Hotel {
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;

  // Add more fields as needed
}

const Reservations: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotel, checkInDate, checkOutDate, guests, selectedHotel, roomType } =
    location.state || {};
  const initialHotels: Hotel[] = hotel ? hotel : [];

  const [hotels, setHotels] = useState<Hotel[]>(initialHotels);

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

  const handleViewRooms = (hotel: Hotel) => {
    navigate("/reservations/rooms", {
      state: { hotel, checkInDate, checkOutDate, guests, roomType },
    });
  };

  return (
    <Container>
      <h1>Hotels</h1>
      <Row>
        {/* <Col>
          <Form className="mb-3">
            <Row>
              <Col xs={9}>
                <Form.Control
                  type="text"
                  placeholder="Search for hotels"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Col>
              <Col xs={3}>
                <Button variant="primary" onClick={handleSearch}>
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Col> */}
      </Row>
      <Row>
        <Col>
          <p>{hotels.length} Hotels Found</p>
        </Col>
      </Row>
      {hotels.map((hotel, index) => (
        <Col key={index} xs={12}>
          <Card className="mb-3" style={{ maxWidth: "100%" }}>
            <Row className="g-0">
              <Col md={3}>
                <Card.Img
                  variant="top"
                  src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww"
                />{" "}
                {/* Replace with your image source */}
              </Col>
              <Col md={9}>
                <Card.Body style={{ fontFamily: "sans-serif" }}>
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
                  {/* Add more fields as needed */}
                  <Card.Text>
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </Card.Text>
                  <hr />
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
