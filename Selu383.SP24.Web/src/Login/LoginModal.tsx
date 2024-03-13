import React from "react";
import { Modal } from "react-bootstrap";
import LoginPage from "./Login"; 

interface LoginModalProps {
  show: boolean;
  onHide: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, onHide }) => {
  const handleLoginSuccess = () => {
    onHide(); 
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LoginPage onSuccess={handleLoginSuccess} /> 
      </Modal.Body>
     
    </Modal>
  );
};

export default LoginModal;
