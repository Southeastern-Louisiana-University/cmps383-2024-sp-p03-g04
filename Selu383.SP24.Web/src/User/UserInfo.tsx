import React, { useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'; 
import './UserInfo.css';

interface User {
  id: number;
  userName: string;
  email: string;
  roles: string[];
}

const UserInfo: React.FC = () => {
  const navigate = useNavigate(); 

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/users');
        if (response.ok) {
          const userData: User[] = await response.json();
          setUser(userData[0]);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

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
