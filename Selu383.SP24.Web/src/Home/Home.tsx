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

  const getHotels = async () => {
    await fetch(`/api/hotels`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      const hotelData = await response.json();
      // const filteredHotels = hotelData.filter((hotel: any) =>
      //   hotel.city.toLowerCase().includes(location.toLowerCase())
      // );
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

    navigate("/reservations", { state: { hotels,checkInDate, checkOutDate } });
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
                  {showDropdown && (
                    <Dropdown className="my-3 show">
                      <Dropdown.Menu show>
                        {hotels.map((hotel, index) => (
                          <Dropdown.Item key={index} onClick={() => setLocation(`${hotel.name} ${hotel.city}`)}>
                            {hotel.name}{" "}{hotel.city}
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
    </>
  );
};

export default Home;
