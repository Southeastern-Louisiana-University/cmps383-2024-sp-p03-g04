import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Image, Animated } from 'react-native';

const Slideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = new Animated.Value(0);

  useEffect(() => {
    const slideWidth = Dimensions.get('window').width;
    
    Animated.loop(
      Animated.timing(translateX, {
        toValue: -slideWidth,
        duration: 5000, // Transition duration (adjust as needed)
        useNativeDriver: true,
      })
    ).start();

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds (adjust as needed)

    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.slideContainer,
          {
            transform: [{ translateX: translateX }],
          },
        ]}
      >
        <View style={styles.slide}>
          <Image source={images[currentIndex]} style={styles.image} />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  slideContainer: {
    flexDirection: 'row',
  },
  slide: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default Slideshow;
