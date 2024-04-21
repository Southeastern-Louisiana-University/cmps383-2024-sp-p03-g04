import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./services.css";

const Services: React.FC = () => {
  const navigate = useNavigate();

  const navigateToPage = (page: string) => {
    console.log("Navigating to:", page);
    navigate(page);
  };

  return (
    <Container fluid style={{paddingTop:'5rem'}}>
      <Row>
        <Col xs={12} sm={6} md={4}>
          <Card
            onClick={() => navigateToPage("/services/enstay-baronne")}
            className="service"
          >
            <Card.Img
              variant="top"
              src="https://imgs.search.brave.com/gxyAXk_M9YVHmRf7_WqGtcyE-Y82ndk7rGVdV5PIxik/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTA3/NjE0NDUwL3Bob3Rv/L2x1eHVyeS1yZXNv/cnQtaG90ZWwtd2l0/aC1zd2ltbWluZy1w/b29sLWF0LXN1bnNl/dC5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9ZVVpanp3LU1r/UHcwMEhBdzQ2NEkz/bXdhNGIxN3locmZ2/aDVIaUdaaUVxbz0"
              alt="EnStay Baronne"
              className="service-icon"
            />
            <Card.Body>
              <Card.Title>
                <b>EnStay Baronne</b>
              </Card.Title>
              <Card.Text>
                225 Baronne St, New Orleans, LA 70112
                <br />
                Epitome of urban luxury.<br/>
                Prime location near the city's vibrant attractions.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={4}>
          <Card
            onClick={() => navigateToPage("/services/enstay-esplanade")}
            className="service"
          >
            <Card.Img
              variant="top"
              src="https://imgs.search.brave.com/4w12ClGdBu4SQk1uvS8XtjwBbPc3Aj5lKad_LAkXRPE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzQ5Lzg5LzAz/LzM2MF9GXzI0OTg5/MDM5NV9GNEVtUG9x/aHN0OXFPc0hlOGoy/d1EyRXM3eWxrVEJv/WS5qcGc"
              alt="EnStay Esplanade"
              className="service-icon"
            />
            <Card.Body>
              <Card.Title>
                <b>EnStay Esplanade</b>
              </Card.Title>
              <Card.Text>
                {" "}
                405 Esplanade Ave, New Orleans, LA 70116
                <br />
               Combines classic charm with modern amenities.<br/>
                Experience the charm of oldest neighborhoods.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={4}>
          <Card
            onClick={() => navigateToPage("/services/enstay-convention")}
            className="service"
          >
            <Card.Img
              variant="top"
              src="https://imgs.search.brave.com/0aaguDzkA4D6I7XMGx_VGDp-gGJcDDrWo8_FidTdxxI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTAz/MDE2OTM0L3Bob3Rv/L2VudHJhbmNlLW9m/LWx1eHVyeS1ob3Rl/bC5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9RFhGenVjQjJ4/V0dmM1BJNl95amhM/S0R2ckZjR2xPcE9q/WGg2S0RJOHJxVT0"
              alt="EnStay Convention"
              className="service-icon"
            />
            <Card.Body>
              <Card.Title>
                <b>EnStay Convention</b>
              </Card.Title>
              <Card.Text>
                200 Convention St, Baton Rouge, LA 70801
                <br />
                Perfect choice for business travelers.<br/>
                We offer sophisticated meeting.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  );
};

export default Services;
