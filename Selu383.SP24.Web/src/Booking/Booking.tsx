/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useLocation } from "react-router-dom";
import { useUser } from "../Login/UserContext";
import { Slide, toast } from "react-toastify";
import "./booking.css";

const Booking: React.FC = () => {
  const location = useLocation();
  const {
    selectedHotelInfo,
    checkInDateFormatted,
    checkOutDateFormatted,
    room,
    guests,
  } = location.state || {};
  console.log("🚀 ~ room:", room);

  // Hotel booking form state (consider using a form library like Formik for complex forms)
  const [firstName, setFirstName] = useState("");
  console.log("🚀 ~ firstName:", firstName);
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  console.log("🚀 ~ email:", email);
  const [phoneNumber, setPhoneNumber] = useState("");
  console.log("🚀 ~ phoneNumber:", phoneNumber);
  const [checkInDate, setCheckInDate] = useState(checkInDateFormatted);
  const [checkOutDate, setCheckOutDate] = useState(checkOutDateFormatted);

  const { user } = useUser();

  const handleCheckInDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckInDate(event.target.value);
  };

  const handleCheckOutDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckOutDate(event.target.value);
  };

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
  const sendEmail = async () => {
    const response = await fetch("/api/email/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: user?.email,
        from: "enstayhotels@gmail.com", // Sender's email
        senderName: "EnStay Hotels", // Logged-in user's name
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
          <strong>Check Out Date:</strong> ${checkOutDateFormatted}
          <br>
          <strong>Number of Guests:</strong> ${guests}
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
      HotelId: selectedHotelInfo.id,
      CheckInDate: checkInDate,
      CheckOutDate: checkOutDate,
      NumberOfGuests: guests,
      IsPaid: false,
      ConfirmationNumber: "1",
    };

    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // include your authorization header
      },
      body: JSON.stringify(reservation),
    });

    if (response.ok) {
      toast.success("Your Reservation has been created successfully", {
        transition: Slide,
      });
      sendEmail();
    } else {
      const error = await response.text();
      toast.error(error, {
        transition: Slide,
      });
    }
  };

  return (
    <Container
      className="checkout"
      fluid
      style={{ width: "80%", marginTop: "2%", textAlign: "left" }}
    >
      <Row>
        <Col xl={8} lg={8} className="mb-4">
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
                  className="me-0 me-md-2 mb-2 mb-md-0 w-100"
                >
                  Register
                </Button>
                <Button
                  variant="primary"
                  className="shadow-0 text-nowrap w-100"
                >
                  Sign in
                </Button>
              </ButtonGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={8} lg={8} className="mb-4">
          <Card className="p-4 shadow-0 border">
            <Card.Body>
              <Card.Title>
                <b>Guest checkout</b>
              </Card.Title>
              <Form onSubmit={handleSubmit}>
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
                {/* <Form.Check
                  type="checkbox"
                  id="flexCheckDefault"
                  label="Keep me up to date on news"
                />

                <hr className="my-4" />

                <Card.Title>Shipping info</Card.Title>
                <Row>
                  <Col lg={4}>
                    <Form.Check
                      type="radio"
                      id="flexRadioDefault1"
                      label="Express delivery"
                      name="shippingOption"
                      checked
                    />
                    <Form.Text className="text-muted">
                      3-4 days via Fedex
                    </Form.Text>
                  </Col>
                  <Col lg={4}>
                    <Form.Check
                      type="radio"
                      id="flexRadioDefault2"
                      label="Post office"
                      name="shippingOption"
                    />
                    <Form.Text className="text-muted">
                      20-30 days via post
                    </Form.Text>
                  </Col>
                  <Col lg={4}>
                    <Form.Check
                      type="radio"
                      id="flexRadioDefault3"
                      label="Self pick-up"
                      name="shippingOption"
                    />
                    <Form.Text className="text-muted">
                      Come to our shop
                    </Form.Text>
                  </Col>
                </Row> */}

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
                <div className="float-end">
                  <Button variant="light" className="border me-2">
                    Cancel
                  </Button>
                  <Button
                    variant="success"
                    className="shadow-0 border"
                    type="submit"
                  >
                    Continue
                  </Button>
                </div>
              </Form>
            </Card.Body>
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
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="expirationMonth">
                      <Form.Label>Expiration Month</Form.Label>
                      <Form.Control type="text" placeholder="MM" required />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="expirationYear">
                      <Form.Label>Expiration Year</Form.Label>
                      <Form.Control type="text" placeholder="YYYY" required />
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
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="billingZip">
                      <Form.Label>Billing Zip</Form.Label>
                      <Form.Control type="text" required />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
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
              {/* <Row>
                <Col xs={6}>
                  <Form.Group controlId="hotelName">
                    <Form.Label>Hotel Name</Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      name="hotelName"
                      defaultValue={selectedHotelInfo.name} // Set default value if available
                      disabled // Prevent editing for now
                    />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group controlId="roomType">
                    <Form.Label>Room Type</Form.Label>
                    <Form.Control
                      size="lg"
                      type="text"
                      name="roomType"
                      defaultValue={
                        room.type == 0 ? "Single King" : "Double Queen"
                      } // Set default value if available
                      disabled // Prevent editing for now
                    />
                  </Form.Group>
                </Col>
              </Row> */}
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
                    <Form.Group controlId="checkInDate">
                      <Form.Label>Check Out Date</Form.Label>
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
                    210.16 USD
                  </span>
                </div>
              </div>
            </Card.Footer>
          </Card>
          {/* <div className="ms-lg-4 mt-4 mt-lg-0" style={{ maxWidth: "320px" }}>
            <h6 className="mb-3">Summary</h6>
            <div className="d-flex justify-content-between">
              <p className="mb-2">Total price:</p>
              <p className="mb-2">$195.90</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="mb-2">Discount:</p>
              <p className="mb-2 text-danger">- $60.00</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="mb-2">Shipping cost:</p>
              <p className="mb-2">+ $14.00</p>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <p className="mb-2">Total price:</p>
              <p className="mb-2 fw-bold">$149.90</p>
            </div>

            <Form.Group className="input-group mt-3 mb-4">
              <Form.Control
                type="text"
                placeholder="Promo code"
                className="border"
              />
              <Button variant="light" className="text-primary border">
                Apply
              </Button>
            </Form.Group>

            <hr />
            <h6 className="text-dark my-4">Items in cart</h6>

            <div className="d-flex align-items-center mb-4">
              <div className="me-3 position-relative">
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary">
                  1
                </span>
                <img
                  src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/7.webp"
                  style={{ height: "96px", width: "96x" }}
                  className="img-sm rounded border"
                />
              </div>
              <div>
                <a href="#" className="nav-link">
                  Gaming Headset with Mic <br />
                  Darkblue color
                </a>
                <div className="price text-muted">Total: $295.99</div>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4">
              <div className="me-3 position-relative">
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary">
                  1
                </span>
                <img
                  src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/5.webp"
                  style={{ height: "96px", width: "96x" }}
                  className="img-sm rounded border"
                />
              </div>
              <div>
                <a href="#" className="nav-link">
                  Apple Watch Series 4 Space <br />
                  Large size
                </a>
                <div className="price text-muted">Total: $217.99</div>
              </div>
            </div>

            <div className="d-flex align-items-center mb-4">
              <div className="me-3 position-relative">
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary">
                  3
                </span>
                <img
                  src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/1.webp"
                  style={{ height: "96px", width: "96x" }}
                  className="img-sm rounded border"
                />
              </div>
              <div>
                <a href="#" className="nav-link">
                  GoPro HERO6 4K Action Camera - Black
                </a>
                <div className="price text-muted">Total: $910.00</div>
              </div>
            </div>
          </div> */}
        </Col>
      </Row>
    </Container>

    // <Container fluid>
    //   <Form onSubmit={handleSubmit}>
    //     <Row>
    //       <Col lg={6}>
    //         <Form.Group controlId="firstName">
    //           <Form.Label>First Name</Form.Label>
    //           <Form.Control
    //             size="lg"
    //             type="text"
    //             name="firstName"
    //             value={user?.userName}
    //             onChange={handleInputChange}
    //             required
    //           />
    //         </Form.Group>
    //       </Col>
    //       <Col>
    //         <Form.Group controlId="lastName">
    //           <Form.Label>Last Name</Form.Label>
    //           <Form.Control
    //             size="lg"
    //             type="text"
    //             name="lastName"
    //             value={lastName}
    //             onChange={handleInputChange}
    //             required
    //           />
    //         </Form.Group>
    //       </Col>
    //     </Row>
    //     <Row>
    //       <Col xs={12}>
    //         <Form.Group controlId="email">
    //           <Form.Label>Email Address</Form.Label>
    //           <Form.Control
    //             size="lg"
    //             type="email"
    //             name="email"
    //             value={user?.email}
    //             onChange={handleInputChange}
    //             required
    //           />
    //         </Form.Group>
    //       </Col>
    //       {/* <Col xs={6}>
    //         <Form.Group controlId="phoneNumber">
    //           <Form.Label>Phone Number</Form.Label>
    //           <Form.Control
    //             size="lg"
    //             type="tel"
    //             name="phoneNumber"
    //             value={phoneNumber}
    //             onChange={handleInputChange}
    //             required
    //           />
    //         </Form.Group>
    //       </Col> */}
    //     </Row>
    //     <Row>
    //       <Col xs={4}>
    //         <Form.Group controlId="guests">
    //           <Form.Label>Number of Guests</Form.Label>
    //           <Form.Control
    //             size="lg"
    //             type="number"
    //             name="guests"
    //             min={1}
    //             value={guests}
    //             onChange={handleInputChange}
    //             required
    //           />
    //         </Form.Group>
    //       </Col>
    //       <Col xs={4}>
    //         <Form.Group controlId="checkInDate">
    //           <Form.Label>Check In Date</Form.Label>
    //           <Form.Control
    //             size="lg"
    //             type="date"
    //             name="checkInDate"
    //             defaultValue={checkInDateFormatted}
    //             onChange={handleCheckInDateChange}
    //             required
    //           />
    //         </Form.Group>
    //       </Col>

    //       <Col xs={4}>
    //         <Form.Group controlId="checkOutDate">
    //           <Form.Label>Check Out Date</Form.Label>
    //           <Form.Control
    //             size="lg"
    //             type="date"
    //             name="checkOutDate"
    //             defaultValue={checkOutDateFormatted}
    //             onChange={handleCheckOutDateChange}
    //             required
    //           />
    //         </Form.Group>
    //       </Col>
    //     </Row>
    //     <Row>
    //       <Col xs={6}>
    //         <Form.Group controlId="hotelName">
    //           <Form.Label>Hotel Name</Form.Label>
    //           <Form.Control
    //             size="lg"
    //             type="text"
    //             name="hotelName"
    //             defaultValue={selectedHotelInfo.name} // Set default value if available
    //             disabled // Prevent editing for now
    //           />
    //         </Form.Group>
    //       </Col>
    //       <Col xs={6}>
    //         <Form.Group controlId="roomType">
    //           <Form.Label>Room Type</Form.Label>
    //           <Form.Control
    //             size="lg"
    //             type="text"
    //             name="roomType"
    //             defaultValue={room.type == 0 ? "Single King" : "Double Queen"} // Set default value if available
    //             disabled // Prevent editing for now
    //           />
    //         </Form.Group>
    //       </Col>
    //     </Row>
    //     <Row>
    //       <Col>
    //         <Form.Group controlId="description">
    //           <Form.Label>Description</Form.Label>
    //           <Form.Control
    //             as="textarea"
    //             width="100%"
    //             rows={3} // Adjust number of rows as needed
    //             size="lg"
    //             name="description"
    //           />
    //         </Form.Group>
    //       </Col>
    //     </Row>
    //     <Button
    //       variant="success"
    //       style={{
    //         width: "30%",
    //       }}
    //       type="submit"
    //     >
    //       Confirm
    //     </Button>
    //   </Form>
    // </Container>
  );
};

export default Booking;
