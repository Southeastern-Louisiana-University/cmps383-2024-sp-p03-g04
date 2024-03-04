import React, { useState } from "react";
import { Card, Container, Row, Col, Form } from "react-bootstrap";
import "./Home.css";
import image from "../images/hotel.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../components/Footer";
import CustomCard from "../components/CustomCard";

const Home: React.FC = () => {
  const currentDate = new Date();
  const [hotels, setHotels] = useState<any[]>([]);
  const [checkInDate, setCheckInDate] = useState<Date | null>(currentDate);
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(tomorrowDate);

  const getHotels = async () => {
    await fetch(`/api/hotels`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (x) => {
      const hotelData = await x.json();
      console.log("sdlkfjdsklfjds", hotelData);
      setHotels(hotelData);
    });
  };

  return (
    <>
      <section
        className="home"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container>
          <Row
            className="justify-content-center align-items-center"
            style={{ minHeight: "calc(100vh - 56px)" }}
          >
            <Col xs={12} sm={6} md={4} lg={3}>
              <CustomCard title="Destination">
                <Card.Body>
                  <Form>
                    <Row className="align-items-center">
                      <Form.Group controlId="location">
                        <div className="dropdown-center">
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            onClick={getHotels}
                          >
                            Choose a location
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                          >
                            {hotels.map((hotel, index) => (
                              <li key={index}>{hotel.name}</li>
                            ))}
                          </ul>
                        </div>
                      </Form.Group>
                    </Row>
                  </Form>
                </Card.Body>
              </CustomCard>
            </Col>

            <Col xs={12} sm={6} md={4} lg={3}>
              <CustomCard title="Check In">
                <Card.Body>
                  <Form.Group controlId="checkInDate">
                    <DatePicker
                      selected={checkInDate}
                      onChange={(date: Date) => setCheckInDate(date)}
                      dateFormat="E MMM dd, yyyy"
                      minDate={new Date()}
                      className="form-control"
                    />
                  </Form.Group>
                </Card.Body>
              </CustomCard>
            </Col>

            <Col xs={12} sm={6} md={4} lg={3}>
              <CustomCard title="Check Out">
                <Card.Body>
                  <Form.Group controlId="checkOutDate">
                    <DatePicker
                      selected={checkOutDate}
                      onChange={(date: Date) => setCheckOutDate(date)}
                      dateFormat="E MMM dd, yyyy"
                      minDate={checkInDate || new Date()}
                      className="form-control"
                    />
                  </Form.Group>
                </Card.Body>
              </CustomCard>
            </Col>

            <Col xs={12} sm={6} md={4} lg={3}>
              <CustomCard title="Rooms & Guests">
                <Card.Body>
                  <div className="box">1 Room, 1 Guest</div>
                </Card.Body>
              </CustomCard>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="home">
        <div>
          <p>Todo: Add content section here....</p>
        </div>
      </section>
    </>
  );
};

export default Home;
