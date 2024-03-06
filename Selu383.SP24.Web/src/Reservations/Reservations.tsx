import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./Reservations.css"; // Import the CSS file

interface Hotel {
  name: string;
  address: string;
  // Add more fields as needed
}

const Reservations: React.FC = () => {
  const location = useLocation();
  const initialHotels: Hotel[] = location.state ? location.state.hotels : [];
  const [hotels, setHotels] = useState<Hotel[]>(initialHotels);
  const [searchQuery, setSearchQuery] = useState("");

  const getHotels = async () => {
    const response = await fetch(`/api/hotels`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const hotelData = await response.json();
    const filteredHotels = hotelData.filter((hotel: any) =>
      hotel.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setHotels(filteredHotels);
  };

  useEffect(() => {
    getHotels();
  }, [searchQuery]);

  const handleSearch = () => {
    getHotels();
  };

  return (
    <Container>
      <h1>Reservations</h1>
      <Row>
        <Col>
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
        </Col>
      </Row>
      <Row>
        <Col>
          <p>{hotels.length} Hotels Found</p>
        </Col>
      </Row>
      <Row>
        {hotels.map((hotel, index) => (
          <Col key={index} xs={12} md={6} lg={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{hotel.name}</Card.Title>
                <Card.Text>{hotel.address}</Card.Text>
                {/* Add more fields as needed */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Reservations;
