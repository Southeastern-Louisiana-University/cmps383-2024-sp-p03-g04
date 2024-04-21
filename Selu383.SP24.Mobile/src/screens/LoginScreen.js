import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useAuth } from '../components/AuthenticationContext';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const { login } = useAuth();
  const navigation = useNavigation();
  const [username, setUsername] = React.useState('');
const [password, setPassword] = React.useState('');
const [userId, setUserId] = React.useState(null); // Initialize userId state

const handleLogin = async () => {
  try {
    const response = await fetch('https://cmps383-2024-sp-p03-g04.azurewebsites.net/api/authentication/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    console.log('Login response:', data);

    if (response.ok) {
      setUserId(data.userId); // Set userId state
      login(data);
      Alert.alert('Login Successful', data.message);
      navigation.navigate('Home', { username: username, userId: data.userId }); // Pass both username and userId
    } else {
      Alert.alert('Login Failed', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        label="Username or Email"
        value={username}
        onChangeText={text => setUsername(text)}
        style={styles.input}
        theme={{
          colors: {
            primary: '#2196F3',
            text: '#2196F3',
          },
        }}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={styles.input}
        theme={{
          colors: {
            primary: '#2196F3',
            text: '#2196F3',
          },
        }}
      />
      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        theme={{ colors: { primary: '#2196F3' } }}
      >
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    marginTop: 10,
  },
});
