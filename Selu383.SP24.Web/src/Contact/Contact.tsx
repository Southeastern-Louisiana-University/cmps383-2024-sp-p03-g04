import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import emailjs from "emailjs-com";
import "./Contact.css";
import { useUser } from "../Login/UserContext";
function Contact() {
  const [message, setMessage] = useState("");

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
          console.log(result.text);
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
          <h1 id="ContactText" className="text-center mb-4">
            Contact Us
          </h1>
          <Form id="contactForm" onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="nameInput">
                  <Form.Label>
                    <b>Name:</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={user?.userName || ""}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="emailInput">
                  <Form.Label>
                    <b>Email:</b>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={user?.email || ""}
                    readOnly
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="messageInput">
                  <Form.Label>
                    <b>Message:</b>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Row>
                <Col>
                  <Button variant="primary" type="submit">
                    Send
                  </Button>
                </Col>
              </Row>
            </Row>
            {message && <p className="mt-3">{message}</p>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
