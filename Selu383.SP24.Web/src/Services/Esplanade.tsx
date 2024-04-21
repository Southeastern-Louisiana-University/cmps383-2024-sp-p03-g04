import React from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
import "./services.css";

const Esplanade: React.FC = () => {
  return (
    <Container fluid style={{paddingTop:'5rem'}}>
      <Row>
        <Col md={6} lg={4} className="service"> 
          <Card>
            <img
              src="https://imgs.search.brave.com/EMdTaQqMmGhpDARcG6RMYRegyw9n91r6APjnNfdTE0I/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTg0/ODYyNzkyL3Bob3Rv/L2JyZWFrZmFzdC1j/b2ZmZWUtYW5kLW11/ZmZpbi5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9T2Q0QmtW/aTdYUUJfZy1DR0Yx/UDJUQUdKY20yNTdC/RnNOQzhSMzR2Y1Ax/WT0" // Replace with actual URL or import the image
              alt="Free Breakfast"
              className="service-icon"
            />
            <h3>Free Breakfast</h3>
            <p>Start your day with a complimentary breakfast buffet.</p>
          </Card>
        </Col>
      
        <Col md={6} lg={4} className="service"> 
          <Card>
            <img
              src="https://imgs.search.brave.com/ynGpdwNK7q9WmBnpnfDxcEjK3vXO6sAy6C-r7rZee2c/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/MWhvdGVscy5jb20v/c2l0ZXMvMWhvdGVs/cy5jb20vZmlsZXMv/c3R5bGVzL2NhcmQv/cHVibGljL2JyYW5k/Zm9sZGVyL3I2Z2ht/anN0emdmN3F6anJ3/MmtmNy8xX0hvdGVs/X1NGXy1fVGhlX0Zp/ZWxkX0hvdXNldzE0/NDAucG5nP2g9NTAy/ZTc1ZmEmaXRvaz1f/c0lYbExORQ" // Replace with actual URL or import the image
              alt="Gym"
              className="service-icon"
            />
            <h3>Gym</h3>
            <p>Stay active with our fully equipped fitness center.</p>
          </Card>
        </Col>
       

        <Col md={6} lg={4} className="service"> 
          <Card>
            <img
              src="https://imgs.search.brave.com/472d9lJ4o_cB9y2ro3kmRb5uYtIu18TvYtq0FNMDU_g/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdHJhdmVs/YXdhaXRzLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMi8w/OC9LaW1wdG9uLVZp/dmFkb3JhLVBldC1Q/aXhsZWUtNzY4eDYx/NC1FcmlrYS1FYnN3/b3J0aC1Hb29sZC5q/cGVnP3Jlc2l6ZT04/MDAsNjQwJnNzbD0x" // Replace with actual URL or import the image
              alt="Pet Friendly"
              className="service-icon"
            />
            <h3>Pet Friendly</h3>
            <p>Bring your furry friends along!</p>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Esplanade;
