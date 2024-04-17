/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

interface Hotel {
  id: number;
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;

  // Add more fields as needed
}
interface Room {
  id: number;
  roomType: number;
  number: number;
  IsPremium: boolean;
  description: string;
  price: number;
  capacity: number;
  IsClean: boolean;
  IsOccupied: boolean;
  hotelId: number;
  hotel: any;
  Reservations: any;
}

const RoomType: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const formatDate = (dateString: string | number) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0-indexed in JavaScript
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };
  const { hotel, checkInDate, checkOutDate, guests, selectedHotel } =
    location.state || {};

  // const initialHotels: Hotel = location.state ? location.state.hotel : [];
  const checkInDateFormatted = checkInDate ? formatDate(checkInDate) : "";
  const checkOutDateFormatted = checkOutDate ? formatDate(checkOutDate) : "";
  const [selectedHotelInfo] = useState<Hotel>(hotel);
  const [rooms, setRooms] = useState<any[]>([]);
  const roomTypeNames = {
    0: "Single King Bed",
    1: "Double Queen Bed",
    2: "Suite Room",
  } as const;

  const getRooms = async (
    hotelId: number,
    checkInDate: string,
    checkOutDate: string
  ) => {
    const response = await fetch(
      `/api/reservations/availableRoomTypes/${hotelId}/${checkInDate}/${checkOutDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const roomData = await response.json();
    console.log("🚀 ~ roomData:", roomData);
    setRooms(roomData);
  };

  useEffect(() => {
    getRooms(hotel.id, checkInDateFormatted, checkOutDateFormatted);
  }, []);

  const handleViewRooms = (room: any) => {
    console.log("🚀 ~ handleViewRooms ~ room:", room);
    navigate(`/reservations/rooms/booking`, {
      state: {
        selectedHotelInfo,
        checkInDateFormatted,
        checkOutDateFormatted,
        room,
        guests,
        selectedHotel,
      },
    });
  };

  return (
    <Container fluid style={{ width: "80%" }}>
      <h1>Available Room</h1>
      <Row>
        <Col>{/* <p>{hotels.length} Hotels Found</p> */}</Col>
      </Row>
      {rooms.map((roomType, index) => (
        <div key={index}>
          {roomType.rooms.map(
            (room: Room, roomIndex: React.Key | null | undefined) => (
              <Col key={roomIndex} xs={12}>
                <Card className="mb-3" style={{ maxWidth: "100%" }}>
                  <Row className="g-0">
                    <Col md={3}>
                      <Card.Img
                        variant="top"
                        src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww"
                      />{" "}
                      {/* Replace with your image source */}
                    </Col>
                    <Col md={9}>
                      <Card.Body style={{ fontFamily: "sans-serif" }}>
                        <Card.Title
                          style={{ fontSize: "30px", fontWeight: "700" }}
                        >
                          {
                            roomTypeNames[
                              roomType.type as keyof typeof roomTypeNames
                            ]
                          }
                        </Card.Title>
                        <Card.Text>
                          <strong>Description:</strong> {room.description}
                          <br />
                          <strong>Capacity:</strong> {room.capacity} people
                          <br />
                          <strong>Price:</strong> {room.price} USD/ Night
                          <br />
                          <br />
                        </Card.Text>
                        {/* Add more fields as needed */}
                        {/* <Card.Text>
                        <small className="text-muted">
                          Last updated 3 mins ago
                        </small>
                      </Card.Text> */}
                        <hr />
                        <button
                          type="button"
                          className="btn btn-success"
                          style={{ marginLeft: "70%" }}
                          onClick={() => {
                            handleViewRooms(room);
                          }}
                        >
                          Book Now
                        </button>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            )
          )}
        </div>
      ))}
    </Container>
  );
};

export default RoomType;
