import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../Login/UserContext";
import { Slide, toast } from "react-toastify";
import "./booking.css";
import LoginModal from "../Login/LoginModal";
import SignupModal from "../SignUp/SignupModal";

const Booking: React.FC = () => {
  const location = useLocation();
  const {
    selectedHotelInfo,
    checkInDateFormatted,
    checkOutDate,
    room,
    guests,
  } = location.state || {};

  const [firtName, setFirstName] = useState("");
  console.log("",firtName);
  const [lastName, setLastName] = useState("");
  console.log("",lastName);
  console.log("🚀 ~ lastName:", lastName);
  const [email, setEmail] = useState("");
  console.log("",email);
  const [phoneNumber, setPhoneNumber] = useState("");
  console.log("",phoneNumber);
  const [checkInDate, setCheckInDate] = useState(checkInDateFormatted);
  const [checkOutdate, ] = useState(checkOutDate);
  const [checkOutDate, setCheckOutDate] = useState(checkOutDateFormatted);
  console.log("🚀 ~ setCheckOutDate:", setCheckOutDate);

  const { user } = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const navigate = useNavigate();

  const handleCheckInDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckInDate(event.target.value);
  };

  const [ConfirmationNumber, setConfirmationNumber] = useState("");

  // const handleCheckOutDateChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setCheckOutDate(event.target.value);
  // };

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      default:
        break;
    }
  };

  const sendEmail = async (confirmationNumber: string) => {
    const response = await fetch("/api/email/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: user?.email,
        from: "enstayhotels@gmail.com", 
        senderName: "EnStay Hotels",
        subject: "Room Reservation Confirmation",
        html: `<strong>Your reservation has been confirmed!</strong>
          <br>
          <strong>Reservation Info:</strong>
          <br>
          <strong>Hotel Name:</strong> ${selectedHotelInfo.name}
          <br>
          <strong>Room Type:</strong> ${
            room.type == 0 ? "Single King" : "Double Queen"
          }
          <br>
          <strong>Check In Date:</strong> ${checkInDateFormatted}
          <br>
          <strong>Check Out Date:</strong> ${checkOutDate}
          <br>
          <strong>Number of Guests:</strong> ${guests}
          <br>
          <strong>Confirmation Number:</strong> ${confirmationNumber}
          <br>`,
      }),
    });

    if (response.ok) {
      console.log("Email sent successfully!");
    } else {
      console.error("Failed to send email");
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const reservation = {
      RoomId: room.id,
      UserId: user?.id,
      HotelId: selectedHotelInfo.id,
      CheckInDate: checkInDate,
      CheckOutDate: checkOutdate,
      NumberOfGuests: guests,
      IsPaid: false,
      ConfirmationNumber: ConfirmationNumber,
    };

    const createReservation = async () => {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservation),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("your confirmation ##" + data.confirmationNumber);
        console.log("Reservation created successfully", data);
        toast.success("Your Reservation has been created successfully", {
          transition: Slide,
        });
        sendEmail(data.confirmationNumber);
      } else {
        const error = await response.text();
        toast.error(error, {
          transition: Slide,
        });
      }
    };

    createReservation();
  };

  return (
    <Container
      className="checkout"
      fluid
      style={{ width: "80%", marginTop: "2%", textAlign: "left" }}
    >
      <Row>
        <Col xl={8} lg={8} className="mb-4">
          {user ? (
            <></>
          ) : (
            <>
              <Card className="mb-4 border shadow-0">
                <Card.Body className="p-4 d-flex justify-content-between">
                  <div>
                    <Card.Title>
                      <b>Have an account?</b>
                    </Card.Title>
                    <Card.Text>
                      You need to login before creating a reservation.
                    </Card.Text>
                  </div>
                  <ButtonGroup
                    vertical={window.innerWidth <= 768}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <Button
                      variant="outline-primary"
                      onClick={() => setShowSignupModal(true)}
                      className="me-0 me-md-2 mb-2 mb-md-0 w-100"
                    >
                      Register
                    </Button>
                    <Button
                      onClick={() => setShowLoginModal(true)}
                      variant="primary"
                      className="shadow-0 text-nowrap w-100"
                    >
                      Log in
                    </Button>
                  </ButtonGroup>
                </Card.Body>
              </Card>
            </>
          )}
        </Col>
        <Col xl={8} lg={8} className="mb-4">
          <Form onSubmit={handleSubmit}>
            <>
              <Card className="p-4 shadow-0 border">
                <Card.Body>
                  <Card.Title>
                    <b>Guest checkout</b>
                  </Card.Title>

                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="firstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                          type="text"
                          value={user?.userName}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="lastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                          type="text"
                          value={user?.userName}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="tel" defaultValue="+1 " />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          value={user?.email}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={8}>
                      <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" required />
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Form.Group controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" required />
                      </Form.Group>
                    </Col>
                    <Col sm={4}>
                      <Form.Group controlId="house">
                        <Form.Label>Apt (Optional)</Form.Label>
                        <Form.Control type="text" />
                      </Form.Group>
                    </Col>
                    <Col sm={4} xs={6}>
                      <Form.Group controlId="postalCode">
                        <Form.Label>Postal code</Form.Label>
                        <Form.Control type="text" required />
                      </Form.Group>
                    </Col>
                    <Col sm={4} xs={6}>
                      <Form.Group controlId="zip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control type="text" required />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Col md={12}>
                    <Form.Group controlId="messageToSeller" className="mb-3">
                      <Form.Label>Additional Request</Form.Label>
                      <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                  </Col>
                </Card.Body>
                <div className="float-end">
                  <Button variant="light" className="border me-2">
                    Cancel
                  </Button>
                  <Button
                    variant="success"
                    className="shadow-0 border"
                    type="submit"
                    disabled={!user}
                  >
                    Continue
                  </Button>
                </div>
              </Card>
              <br />
              <Card className="p-4 mb-4 border shadow-0">
                <Card.Body>
                  <Card.Title>
                    <b>Payment Information</b>
                  </Card.Title>
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="cardNumber">
                          <Form.Label>Credit/Debit Card Number</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter card number"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group controlId="expirationMonth">
                          <Form.Label>Expiration Month</Form.Label>
                          <Form.Control type="text" placeholder="MM" />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group controlId="expirationYear">
                          <Form.Label>Expiration Year</Form.Label>
                          <Form.Control type="text" placeholder="YYYY" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="align-items-start">
                      <Col>
                        <Form.Group controlId="cvv">
                          <Form.Label>CVV Number</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter CVV number"
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="billingZip">
                          <Form.Label>Billing Zip</Form.Label>
                          <Form.Control type="text" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <br />
                  </Form>
                </Card.Body>
              </Card>
            </>
          </Form>
        </Col>
        <Col
          xl={4}
          lg={4}
          md={12}
          className="d-flex justify-content-center justify-content-lg-end"
        >
          <Card
            className="ms-lg-4 mt-4 mt-lg-0"
            style={{ maxWidth: "320px", maxHeight: "550px" }}
          >
            <Card.Img
              variant="top"
              src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww"
            />
            <Card.Body>
              <Card.Title>
                <b>{selectedHotelInfo.name}</b>{" "}
              </Card.Title>
              <Card.Title>
                <b>
                  {room.type === 0
                    ? "Single King"
                    : room.type === 1
                    ? "Double Queen"
                    : "Suite"}
                </b>
              </Card.Title>
              <Card.Link>Room Details </Card.Link>
              <Card.Text>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="checkInDate">
                      <Form.Label>Check In Date</Form.Label>
                      <Form.Control
                        size="sm"
                        type="date"
                        name="checkInDate"
                        defaultValue={checkInDateFormatted}
                        onChange={handleCheckInDateChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="checkOutDate">
                      <Form.Label>Check Out Date</Form.Label>
                      <Form.Control
                        size="sm"
                        type="date"
                        name="checkOutDate"
                        defaultValue={checkOutdate}
                        onChange={handleCheckInDateChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Form.Label>Number of Guests: {guests}</Form.Label>
                </Row>
              </Card.Text>
              <Card.Link>Edit Stay Details</Card.Link>
            </Card.Body>
            <Card.Footer>
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Summary of Charges</h6>
                <div className="text-right ml-4">
                  <span className="total-cost" style={{ fontSize: 16 }}>
                    {room.price}.00 USD
                  </span>
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
      />
      <SignupModal
        show={showSignupModal}
        onHide={() => setShowSignupModal(false)}
      />
    </Container>
  );
};

export default Booking;
