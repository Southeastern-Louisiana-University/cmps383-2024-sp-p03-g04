import React, { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "./booking.css";

const Booking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    selectedHotelInfo,
    checkInDateFormatted,
    checkOutDateFormatted,
    selectedRoom,
    guests,
    selectedHotel,
    roomType,
  } = location.state || {};
  console.log("23432423hotel:", selectedHotelInfo);
  console.log("🚀 ~ checkInDate:", checkInDateFormatted);
  console.log("🚀 ~ hotel:", guests);

  // Hotel booking form state (consider using a form library like Formik for complex forms)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {};

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col lg={6}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              size="lg"
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              size="lg"
              type="tel"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Form.Group controlId="guests">
            <Form.Label>Number of Guests</Form.Label>
            <Form.Control
              size="lg"
              type="number"
              name="guests"
              min={1}
              value={guests}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group controlId="checkInDate">
            <Form.Label>Check In Date</Form.Label>
            <Form.Control
              size="lg"
              type="date"
              name="checkInDate"
              defaultValue={checkInDateFormatted}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Form.Group controlId="hotelName">
            <Form.Label>Hotel Name</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="hotelName"
              defaultValue={selectedHotelInfo.name} // Set default value if available
              disabled // Prevent editing for now
            />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group controlId="roomType">
            <Form.Label>Room Type</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="roomType"
              defaultValue={roomType} // Set default value if available
              disabled // Prevent editing for now
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col >
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              width="100%"
              rows={3} // Adjust number of rows as needed
              size="lg"
              name="description"
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default Booking;
