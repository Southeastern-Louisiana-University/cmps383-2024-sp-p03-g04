import React from 'react';
import { View, StyleSheet } from 'react-native';
import Slideshow from '../components/slideshow';

const HomeScreen = () => {
  const images = [require('../../assets/images/hotelExterior1.png'), require('../../assets/images/hotelRoom1.png'), require('../../assets/images/hotelExterior2.png'), require('../../assets/images/hotelBar.png'), require('../../assets/images/hotelExterior3.png')]

  return (
    <View style={styles.container}>
      <Slideshow images={images} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
