import React from 'react';
import { Container, Row, Col } from "react-bootstrap";


const Rooms: React.FC = () => {
  return (
    <Container className="rooms-container">
      <h2 className="rooms-heading">Rooms</h2>
      <Row>
        <Col md={4} className="room">
          <h3>Premium Room</h3>
          <p>Description of Premium Room</p>
          {/* Add any additional information or features of the premium room */}
        </Col>
        <Col md={4} className="room">
          <h3>Suite Room</h3>
          <p>Description of Suite Room</p>
          {/* Add any additional information or features of the suite room */}
        </Col>
        <Col md={4} className="room">
          <h3>Regular Room</h3>
          <p>Description of Regular Room</p>
          {/* Add any additional information or features of the regular room */}
        </Col>
      </Row>
    </Container>
  )
}

export default Rooms;
