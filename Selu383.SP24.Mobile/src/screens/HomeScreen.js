import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { List } from 'react-native-paper'; // Import List component from react-native-paper

const HomeScreen = ({ route }) => {
  const { username, userId } = route.params; 
  console.log(userId, username);// Get username and userId from route params
  const [reservations, setReservations] = useState([]); // State to hold reservations data
  const [amenities, setAmenities] = useState([]); // State to hold hotel amenities data

  // Sample reservation data
  const sampleReservations = [
    {
      roomNumber: '101',
      checkInDate: '2024-04-20',
      checkOutDate: '2024-04-22',
      numberOfGuests: 2,
      confirmationNumber: 'ABCD1234',
      location: '225 Baronne St, New Orleans, LA 70112',
      hotelName: 'EnStay Baronne',
      amenities: ['Free Wi-Fi', 'Swimming Pool', 'Gym']
    },
    {
      roomNumber: '202',
      checkInDate: '2024-04-25',
      checkOutDate: '2024-04-28',
      numberOfGuests: 3,
      confirmationNumber: 'EFGH5678',
      location: '405 Esplanade Ave, New Orleans, LA 70116',
      hotelName: 'EnStay Esplanade',
      amenities: ['Free Breakfast', 'Parking', 'Restaurant']
    },
    // Add more sample reservations as needed
  ];

  useEffect(() => {
    // Set the sample reservations when component mounts
    setReservations(sampleReservations);

    // Extract and set unique amenities from sample reservations
    const amenitiesSet = new Set();
    sampleReservations.forEach(reservation => {
      reservation.amenities.forEach(amenity => {
        amenitiesSet.add(amenity);
      });
    });
    setAmenities(Array.from(amenitiesSet));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {username}!</Text>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Upcoming Reservations:</Text>
        <List.Section>
          {reservations.map((reservation, index) => (
            <List.Item
              key={index}
              title={`Room ${reservation.roomNumber}`}
              description={
                <View style={styles.descriptionContainer}>
                  <Text style={styles.details}>
                    Hotel Name: {reservation.hotelName}</Text>
                  <Text style={styles.details}>
                    Location: {reservation.location}</Text>
                  <Text style={styles.details}>
                    Check-in: {reservation.checkInDate}
                  </Text>
                  <Text style={styles.details}>
                    Check-out: {reservation.checkOutDate}
                  </Text>
                  <Text style={styles.details}>
                    Guests: {reservation.numberOfGuests}
                  </Text>
                  <Text style={styles.details}>
                    Confirmation Code: {reservation.confirmationNumber}
                  </Text>
                </View>
              }
              titleStyle={styles.titleStyle} // Custom title style
              descriptionStyle={styles.descriptionStyle} // Custom description style
            />
          ))}
        </List.Section>
        <Text style={styles.sectionTitle}>All EnStay Hotels Include:</Text>
        <List.Section>
          {amenities.map((amenity, index) => (
            <List.Item
              key={index}
              title={amenity}
              titleStyle={styles.amenityStyle}
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
    fontSize: 34,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  content: {
    flex: 1,
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  titleStyle: {
    fontSize: 20, // Larger font size for the title
    fontFamily: 'cursive', // Use cursive font family
    fontWeight: 'bold',
  },
  descriptionStyle: {
    fontSize: 18, // Larger font size for the description
  },
  descriptionContainer: {
    marginLeft: 16,
  },
  details: {
    fontSize: 16,
  },
  amenityStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
