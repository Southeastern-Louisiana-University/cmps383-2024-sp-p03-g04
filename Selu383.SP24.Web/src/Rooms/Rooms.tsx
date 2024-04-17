import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./rooms.css";

const Rooms: React.FC = () => {
  return (
    <Container fluid className="rooms-container">
      <h2 className="rooms-heading">Rooms</h2>
      <Row>
        <Col md={12} className="room">
          <Card.Img
            className="card-img-top"
            style={{
              minHeight: "75vh",
              objectFit: "cover",
              maxHeight: "75vh",
              width: "100%",
              borderRadius: "20px",
            }}
            src="https://th.bing.com/th/id/R.10790e90e41c325a167eb776a835a7f7?rik=p1Uz0DxRjA97Bg&pid=ImgRaw&r=0"
          />
          <Card.Body>
            <h3>Premium Room</h3>
            <p
              style={{
                color: "#343a40",
                fontFamily: "Georgia, serif",
                fontSize: "20px",
                alignItems: "right",
              }}
            >
              Immerse yourself in the epitome of luxury with our Premium Rooms.
              Offering a sweeping, uninterrupted view of the tranquil beach,
              these rooms redefine seaside living. Step onto your private
              balcony and let the gentle sea breeze envelop you as you soak in
              breathtaking vistas. Inside, spacious accommodations await,
              complete with an attached living space designed for relaxation and
              rejuvenation. Whether you're savoring a morning coffee or
              unwinding with a book, the panoramic backdrop of the beach
              enhances every moment of your stay.
            </p>
          </Card.Body>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="room">
          <Card.Body>
            <h3>Suite Room</h3>
            <p
              style={{
                color: "#343a40",
                fontFamily: "Georgia, serif",
                fontSize: "20px",
                alignItems: "right",
              }}
            >
              Elevate your coastal getaway with our Suite Rooms, where comfort
              meets elegance against the backdrop of the mesmerizing beach. Each
              suite offers a picturesque view of the shoreline, inviting you to
              unwind in style. Enjoy the luxury of a separate living room,
              thoughtfully designed for both leisure and productivity. Whether
              you're lounging with loved ones or catching up on work, the serene
              ambiance and stunning vistas ensure a memorable experience. With
              ample space and contemporary amenities, our suites offer a refined
              retreat for discerning travelers seeking both relaxation and
              sophistication.
            </p>
          </Card.Body>
          <Card.Img
            className="card-img-top"
            style={{
              minHeight: "75vh",
              objectFit: "cover",
              maxHeight: "75vh",
              width: "100%",
              borderRadius: "20px",
            }}
            src="https://photos.mandarinoriental.com/is/image/MandarinOriental/dmo-Seven-suites-04-Dubai"
          />
        </Col>
      </Row>
      <Row>
        <Col md={12} className="room">
          <Card.Img
            className="card-img-top"
            style={{
              minHeight: "75vh",
              objectFit: "cover",
              maxHeight: "75vh",
              width: "100%",
              borderRadius: "20px",
            }}
            src="https://cache.marriott.com/marriottassets/marriott/LASJW/lasjw-suite-0084-hor-clsc.jpg?interpolation=progressive-bilinear&"
          />

          <Card.Body>
            <h3>Regular Room</h3>
            <p
              style={{
                color: "#343a40",
                fontFamily: "Georgia, serif",
                fontSize: "20px",
                alignItems: "right",
              }}
            >
              Experience the essence of coastal charm and comfort in our Regular
              Rooms. Designed for simplicity and tranquility, these cozy
              accommodations provide a peaceful haven for your beachside
              retreat. While these rooms may not have an attached living space,
              they offer everything you need for a restful stay. Sink into plush
              bedding after a day of seaside adventures, and wake up refreshed
              and ready to embrace the day. With modern amenities and a
              welcoming ambiance, our Regular Rooms offer an affordable option
              without compromising on quality or comfort.
            </p>
          </Card.Body>
        </Col>
      </Row>
    </Container>
  );
};

export default Rooms;
