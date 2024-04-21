import React, { useState, useEffect } from "react";
import { Card, Row, Col, Form, Dropdown, Button } from "react-bootstrap";
import "./Home.css";
import homeImage from "../images/hotel.jpg";
import "react-datepicker/dist/react-datepicker.css";
import "../components/Footer";
import CustomCard from "../components/CustomCard";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../Utils/dateUtils";

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
  const [selectedHotel, setselectedHotel] = useState("");

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
      setShowDropdown(true); 
    } else {
      setShowDropdown(false);
    }
  }, [hotels]);

  const handleSearch = async () => {
    await getHotels();
    navigate("/reservations", {
      state: { selectedHotel, hotels, checkInDate, checkOutDate: formatDate(checkOutDate || tomorrowDate), guests },
    });
  };

  return (
    <>
      <section
        className="home"
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
          backgroundSize: "cover",
          minHeight: "100vh",
          maxHeight: "100vh",
          width: "100%",
        }}
      >
        <>
          <Row>
            <Col>
              <Card className="text-dark bg-light mb-3">
                <Card.Body>
                  <Row>
                    <Col>
                      <CustomCard title="Hotels">
                        <br />
                        <Form>
                          <Row className="align-items-center">
                            <Col>
                              <Form.Group controlId="location">
                                <Form.Control
                                  type="text"
                                  placeholder="Search for hotels"
                                  value={location}
                                  onChange={(e) => {
                                    setLocation(e.target.value);
                                    getHotels();
                                  }}
                                />
                              </Form.Group>
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
                                onClick={() => {
                                  setLocation(`${hotel.name} ${hotel.city}`);
                                  setselectedHotel(`${hotel.id}`);
                                }}
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
                            <Form.Control
                              type="date"
                              value={formatDate(checkInDate || tomorrowDate)}
                              onChange={(e) =>{
                                console.log('Selected Check-In Date:', e.target.value);
                                setCheckInDate(new Date(e.target.value))
                              }
                              }
                            ></Form.Control>
                          </Form.Group>
                        </Card.Body>
                      </CustomCard>
                    </Col>
                    <Col>
                      <CustomCard title="Check Out">
                        <Card.Body>
                          <Form.Group controlId="checkOutDate">
                            <Form.Control
                              type="date"
                              value={checkOutDate ? formatDate(checkOutDate) : ''}
                            
                              onChange={(e) =>{
                                console.log('Selected Check-out Date:', e.target.value);
                                setCheckOutDate(new Date(e.target.value))
                              }
                              }
                            ></Form.Control>
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
                  <Row
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="success"
                      style={{
                        width: "30%",
                      }}
                      onClick={handleSearch}
                    >
                      Search a hotel
                    </Button>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      </section>
      <section className="about-us-section">
          <Row>
            <span className="section-heading"> Louisiana's Luxury Escape</span>
            <Col md={6}>
              <div className="image-container">
                <img
                  src={homeImage}
                  alt="EnStay Hotel"
                  className="image"
                
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="content">
                <p>
                  EnStay welcomes you to Louisiana's finest in luxury
                  accommodations. With prime locations in New Orleans and Baton
                  Rouge, our hotels epitomize elegance and comfort. From
                  meticulously designed rooms to gourmet dining and rejuvenating
                  spa treatments, we ensure an unparalleled experience. Explore
                  the vibrant culture of Louisiana or unwind in our serene
                  ambiance. At EnStay, hospitality is a lifestyle. Join us for
                  an unforgettable journey where every moment is tailored to
                  perfection. Welcome to EnStay, where luxury meets unparalleled
                  hospitality.
                </p>
              </div>
            </Col>
          </Row>
      </section>
    </>
  );
};

export default Home;
