import React from "react";
import { Modal } from "react-bootstrap";
import SignupPage from "./SignUp";

interface SignupModalProps {
  show: boolean;
  onHide: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ show, onHide }) => {
    const handleSignupSuccess = () => {
      onHide(); 
    };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>SignUp</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SignupPage onSuccess={handleSignupSuccess} /> 
      </Modal.Body>
      
    </Modal>
  );
};

export default SignupModal;
