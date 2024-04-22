import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import emailjs from "emailjs-com";
import "./Contact.css";
import { useUser } from "../Login/UserContext";
function Contact() {
  const [message, setMessage] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const { user } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending email...");
    emailjs
      .sendForm(
        "service_vbc20mb",
        "template_9c1qmod",
        e.target as HTMLFormElement,
        "KgDE1Vmfz9xwGK0Bp"
      )
      .then(
        (result) => {
          console.log("🚀 ~ handleSubmit ~ result:", result)
          setMessage("");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <Container fluid>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={8}>
          <h1 className="text-center mb-4">Contact Us</h1>
          <Form
            id="contactForm"
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "#f8f9fa",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <Row className="mb-3">
              <Col xs={12} md={4}>
                <Form.Group controlId="nameInput">
                  <Form.Label>
                    <b>Name:</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={user?.userName || ""}
                    style={{ borderRadius: "10px" }}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={4} className="mb-4">
                <Form.Group controlId="emailInput">
                  <Form.Label>
                    <b>Email:</b>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={user?.email || ""}
                    style={{ borderRadius: "10px" }}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={4} className="mb-4">
                <Form.Group controlId="phoneNumber">
                  <Form.Label>
                    <b>Phone Number:</b>
                  </Form.Label>
                  <Form.Control
                    type="phone"
                    name="phone"
                    defaultValue={"+1 " + phone}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    style={{ borderRadius: "10px" }}
                  />
                </Form.Group>
              </Col>

              <Col className="mb-4">
                <Form.Group controlId="messageInput">
                  <Form.Label>
                    <b>Message:</b>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={message}
                    rows={10}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ borderRadius: "10px" }}
                  />
                </Form.Group>
              </Col>

              <Row>
                <Col>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ borderRadius: "10px" }}
                  >
                    Send
                  </Button>
                </Col>
              </Row>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
