import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./Contact.css";
import { useUser } from "../Login/UserContext";
function Contact() {
  const [message, setMessage] = useState("");

  const { user } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send email using emailjs
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
          // Reset form fields
          setMessage("");
        },
        (error) => {
          console.log("🚀 ~ handleSubmit ~ error:", error)
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      <h1 id="ContactText">Contact Us</h1>
      <div className="ContactOragnizer">
        <form id="contactForm" onSubmit={handleSubmit}>
          <label htmlFor="nameInput" id="contactLabel">
            <b>Name:</b>
            <input
              type="text"
              id="nameInput"
              name="name"
              value={user?.userName || ""}
              readOnly
            />
          </label>
          <br />
          <label htmlFor="emailInput" id="contactLabel">
            <b>Email:</b>
            <input
              type="email"
              id="emailInput"
              name="email"
              value={user?.email || ""}
              readOnly
            />
          </label>
          <br />
          <label htmlFor="messageInput">
            <b>Message:</b>
            <textarea
              id="messageInput"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <br />
          <button type="submit" id="contactSubmit">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
