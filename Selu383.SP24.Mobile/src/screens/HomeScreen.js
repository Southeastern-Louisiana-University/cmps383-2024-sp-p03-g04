import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { List } from 'react-native-paper'; // Import List component from react-native-paper

const HomeScreen = ({ route }) => {
  const { username, userId } = route.params; // Get username and userId from route params
  const [reservations, setReservations] = useState([]); // State to hold reservations data

  useEffect(() => {
    // Fetch reservations data when component mounts
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch(`https://cmps383-2024-sp-p03-g04.azurewebsites.net/api/reservations/user/${userId}`, {
        method: 'GET', // Specify the HTTP request method
        headers: {
          'Content-Type': 'application/json', // Specify the content type of the request
        },
        // Optionally, include a request body if needed
        // body: JSON.stringify({ /* your request body data */ }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      // Handle error gracefully (e.g., show a message to the user)
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {username}!</Text>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Upcoming Reservations</Text>
        <List.Section>
          {reservations.map((reservation, index) => (
            <List.Item
              key={index}
              roomNumber={reservation.roomId}
              checkInDate={reservation.checkInDate}
              checkOutDate={reservation.checkOutDate}
              numberOfGuests={reservation.numberOfGuests}
              confirmationNumber={reservation.confirmationNumber}
            />
          ))}
        </List.Section>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  content: {
    flex: 1,
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HomeScreen;
