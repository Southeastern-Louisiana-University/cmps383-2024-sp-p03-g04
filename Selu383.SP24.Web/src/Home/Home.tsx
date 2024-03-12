import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Dropdown,
  Button,
} from "react-bootstrap";
import "./Home.css";
import image from "../images/hotel.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../components/Footer";
import CustomCard from "../components/CustomCard";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const currentDate = new Date();
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [hotels, setHotels] = useState<any[]>([]);
  const [checkInDate, setCheckInDate] = useState<Date | null>(currentDate);
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(tomorrowDate);
  const [showDropdown, setShowDropdown] = useState(false);

  const [guests, setGuests] = useState(1);
  const [roomType, setRoomType] = useState("Single");
  const [roomTypes, setRoomTypes] = useState(["Single", "Double"]);

  useEffect(() => {
    if (guests >= 3) {
      setRoomTypes(["Double"]);
      setRoomType("Double");
    } else {
      setRoomTypes(["Single", "Double"]);
    }
  }, [guests]);

  const getHotels = async () => {
    await fetch(`/api/hotels`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      const hotelData = await response.json();
      setHotels(hotelData);
    });
  };

  useEffect(() => {
    if (hotels.length > 0) {
      setShowDropdown(true); // Show dropdown if hotels are available
    } else {
      setShowDropdown(false);
    }
  }, [hotels]);

  const handleSearch = async () => {
    await getHotels();
    navigate("/reservations", { state: { hotels, checkInDate, checkOutDate } });
  };

  return (
    <>
      <section
        className="home"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <Container className="position-absolute top-50 start-50 translate-middle">
          <Row>
            <Col>
              <Card className="text-dark bg-light mb-3">
                <Card.Body>
                  <Row>
                    <Col>
                      <CustomCard title="Hotels"> <br/>
                        <Form>
                          <Row className="align-items-center">
                            <Col xs={9}>
                              <Form.Group controlId="location">
                                <Form.Control
                                  type="text"
                                  placeholder="Search for hotels"
                                  value={location}
                                  onChange={(e) => {
                                    setLocation(e.target.value);
                                    getHotels(); // Trigger hotel fetching on input change
                                  }}
                                />
                              </Form.Group>
                            </Col>
                            <Col xs={3}>
                              <Button variant="primary" onClick={handleSearch}>
                                <BiSearch />
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </CustomCard>
                      {showDropdown && (
                        <Dropdown className="my-3 show">
                          <Dropdown.Menu show>
                            {hotels.map((hotel, index) => (
                              <Dropdown.Item
                                key={index}
                                onClick={() =>
                                  setLocation(`${hotel.name} ${hotel.city}`)
                                }
                              >
                                {hotel.name} {hotel.city}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      )}
                    </Col>
                    <Col>
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
                    <Col>
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
                    <Col>
                      <CustomCard title="Rooms & Guests">
                        <Card.Body>
                          <Form>
                            <Form.Group controlId="roomAndGuests">
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="info"
                                  id="dropdown-basic"
                                >
                                  {guests
                                    ? ` ${roomType} Bed & ${guests} Guest`
                                    : "Select Rooms & Guests"}
                                </Dropdown.Toggle>

                                <Dropdown.Menu style={{ width: "100%" }}>
                                  <Form>
                                    <Form.Group controlId="guests">
                                      <Form.Label>Number of Guests</Form.Label>
                                      <select
                                        className="form-select"
                                        value={guests}
                                        onChange={(e) =>
                                          setGuests(Number(e.target.value))
                                        }
                                      >
                                        {[1, 2, 3, 4].map((num) => (
                                          <option key={num} value={num}>
                                            {num}
                                          </option>
                                        ))}
                                      </select>
                                    </Form.Group>

                                    <Form.Group controlId="roomType">
                                      <Form.Label>Room Type</Form.Label>
                                      <select
                                        className="form-select"
                                        value={roomType}
                                        onChange={(e) =>
                                          setRoomType(e.target.value)
                                        }
                                      >
                                        {roomTypes.map((type) => (
                                          <option key={type} value={type}>
                                            {type}
                                          </option>
                                        ))}
                                      </select>
                                    </Form.Group>
                                  </Form>
                                </Dropdown.Menu>
                              </Dropdown>
                            </Form.Group>
                          </Form>
                        </Card.Body>
                      </CustomCard>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
