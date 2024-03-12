import React from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'; 
import { useUser } from '../Login/UserContext';
import './UserInfo.css';

const UserInfo: React.FC = () => {
  const navigate = useNavigate(); 
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-info-container"> 
      <Card className="user-info-card">
        <Card.Body>
          <Card.Title className="user-info-title">User Information</Card.Title>
          <Card.Text className="user-info-details">
            <strong>Username:</strong> {user.userName}<br />
            <strong>Email:</strong> {user.email}<br />
            <strong>Roles:</strong> {user.roles.join(', ')}
          </Card.Text>
        </Card.Body>
        <div className="update-button-container"> 
          <Button variant="primary" onClick={() => navigate('/profile/update')}> 
            Update Profile
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UserInfo;
