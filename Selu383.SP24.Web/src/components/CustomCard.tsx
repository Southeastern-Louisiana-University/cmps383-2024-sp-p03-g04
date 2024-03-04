import React from "react";
import { Card as BootstrapCard } from "react-bootstrap";
interface CardProps {
  title: string;
  children: React.ReactNode;
}

const CustomCard: React.FC<CardProps> = ({ title, children }) => {
  
  return (
    <BootstrapCard className="text-dark bg-light mb-3">
      <BootstrapCard.Body>
        <BootstrapCard.Title>{title}</BootstrapCard.Title>
        {children}
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default CustomCard;
