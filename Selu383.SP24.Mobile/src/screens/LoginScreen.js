import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ImageBackground, Alert, StyleSheet, Text } from 'react-native';

const CustomButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Send login request to your API
      const response = await fetch('https://localhost:7116/swagger/v1/swagger.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Check response status
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      // Parse response data
      const data = await response.json();

      // Save authentication token or session ID
      // For example, save to AsyncStorage
      await AsyncStorage.setItem('token', data.token);

      // Navigate to home screen
      // For example, navigate using React Navigation
      // navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ImageBackground
      
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Username or E-mail"
          onChangeText={text => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry
        />
        <CustomButton title="Login" onPress={handleLogin} />
        <CustomButton title="Sign-Up" />
        <CustomButton title="Forgot Password?" />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Adjust opacity here
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust opacity here
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 20, 
    paddingVertical: 5, 
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue', // Change text color to blue
  },
});

export default LoginScreen;
