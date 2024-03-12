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
import image from "../images/resort.webp";
import homeImage from '../images/hotel.jpg'
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
        }}
      >
        <Container>
          <Row
            className="justify-content-center align-items-center"
            style={{ minHeight: "calc(100vh - 56px)" }}
          >
            <Col xs={12} sm={6} md={3}>
              <Card className="text-dark bg-light mb-3">
                <Card.Body>
                  <Card.Title>Hotels </Card.Title>
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
                              getHotels();
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
                </Card.Body>
              </Card>
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
      <section className="about-us-section">
        <Container>
          <Row>
            <Col>
              <h2>EnStay</h2>
              <section className="home">
                <div className="image-container">
                  <img src={homeImage} alt="EnStay Hotel" className="image" />
                </div>
                <div className="content">
                  <p>
                    EnStay welcomes you to Louisiana's finest in luxury
                    accommodations. With prime locations in New Orleans and
                    Baton Rouge, our hotels epitomize elegance and comfort. From
                    meticulously designed rooms to gourmet dining and
                    rejuvenating spa treatments, we ensure an unparalleled
                    experience. Explore the vibrant culture of Louisiana or
                    unwind in our serene ambiance. At EnStay, hospitality is a
                    lifestyle. Join us for an unforgettable journey where every
                    moment is tailored to perfection. Welcome to EnStay, where
                    luxury meets unparalleled hospitality.
                  </p>
                </div>
              </section>
              <h3>Our Commitment:</h3>
              <p>
                At EnStay, we are dedicated to providing our guests with
                exceptional service and unforgettable experiences. Whether
                you're traveling for business or pleasure, our friendly staff is
                here to ensure that your stay is nothing short of extraordinary.
              </p>
              <p>
                Indulge in luxury, immerse yourself in Southern hospitality, and
                make EnStay your home away from home. We look forward to
                welcoming you to EnStay and making your visit to Louisiana truly
                memorable.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
