import React from "react";
import { Container, Card, Col, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import CarouselImage from "../images/hotel.jpg";
import CImage from "../images/r.jpg";
import Image from "../images/h.webp";
import "./about.css";

const About: React.FC = () => {
  return (
    <>
      <Row>
        <h2 className="section-heading">  </h2>
        <Col md={6} style={{ paddingLeft: "2rem" }}>
          <Carousel fade>
            <Carousel.Item>
              <img
                src={CarouselImage}
                alt="First slide"
                style={{
                  maxHeight: "60vh",
                  objectFit: "cover",
                  overflow: "hidden",
                  width: "100%",
                  borderRadius: "20px",
                }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src={Image}
                alt="Second slide"
                style={{
                  maxHeight: "60vh",
                  objectFit: "cover",
                  overflow: "hidden",
                  width: "100%",
                  borderRadius: "20px",
                }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src={CImage}
                alt="Third slide"
                style={{
                  maxHeight: "60vh",
                  objectFit: "cover",
                  overflow: "hidden",
                  width: "100%",
                  borderRadius: "20px",
                }}
              />
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col md={6} style={{ padding: "5rem" }}>
          <Container fluid>
            <p>
              Welcome to <b>EnStay</b>,<br/> your premier destination for luxury hotel
              accommodations in Louisiana. With three convenient locations in
              New Orleans and Baton Rouge, EnStay offers unparalleled comfort,
              elegance, and hospitality.
              <br />
              At EnStay, we pride ourselves on providing an exceptional
              experience for our guests from the moment they step through our
              doors. Our commitment to excellence is evident in every aspect of
              our accommodations, from the meticulously designed rooms to the
              impeccable service provided by our dedicated staff.
            </p>
          </Container>
        </Col>
      </Row>
      <h2 className="section-heading"> Locations </h2>

      <Container fluid>
        <Row>
          <Col sm={12} md={6} lg={4}>
            <Card className="mb-3">
              <Card.Img
                variant="top"
                src="https://imgs.search.brave.com/gxyAXk_M9YVHmRf7_WqGtcyE-Y82ndk7rGVdV5PIxik/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTA3/NjE0NDUwL3Bob3Rv/L2x1eHVyeS1yZXNv/cnQtaG90ZWwtd2l0/aC1zd2ltbWluZy1w/b29sLWF0LXN1bnNl/dC5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9ZVVpanp3LU1r/UHcwMEhBdzQ2NEkz/bXdhNGIxN3locmZ2/aDVIaUdaaUVxbz0"
              />
              <Card.Body>
                <Card.Title>
                  <b>EnStay Baronne</b>
                </Card.Title>
                <Card.Text>
                  Address: 225 Baronne St, New Orleans, LA 70112 <br />
                  
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={12} md={6} lg={4}>
            <Card className="mb-3">
              <Card.Img
                variant="top"
                src="https://imgs.search.brave.com/4w12ClGdBu4SQk1uvS8XtjwBbPc3Aj5lKad_LAkXRPE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzQ5Lzg5LzAz/LzM2MF9GXzI0OTg5/MDM5NV9GNEVtUG9x/aHN0OXFPc0hlOGoy/d1EyRXM3eWxrVEJv/WS5qcGc"
              />
              <Card.Body>
                <Card.Title>
                  <b>EnStay Esplanade</b>
                </Card.Title>
                <Card.Text>
                  Address: 405 Esplanade Ave, New Orleans, LA 70116 <br />
                 
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={12} md={6} lg={4}>
            <Card className="mb-3">
              <Card.Img
                variant="top"
                src="https://imgs.search.brave.com/0aaguDzkA4D6I7XMGx_VGDp-gGJcDDrWo8_FidTdxxI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTAz/MDE2OTM0L3Bob3Rv/L2VudHJhbmNlLW9m/LWx1eHVyeS1ob3Rl/bC5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9RFhGenVjQjJ4/V0dmM1BJNl95amhM/S0R2ckZjR2xPcE9q/WGg2S0RJOHJxVT0"
              />
              <Card.Body>
                <Card.Title>
                  <b>EnStay Convention</b>
                </Card.Title>
                <Card.Text>
                  Address: 200 Convention St, Baton Rouge, LA 70801 <br />
                
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
