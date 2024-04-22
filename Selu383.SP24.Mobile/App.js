import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import { AuthProvider, useAuth } from './src/components/AuthenticationContext';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="LoginScreen">
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Home" component={HomeScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

function InitialRoute() {
  const { user } = useAuth(); // Access user authentication status
  const initialRoute = user ? 'Home' : 'Login';

  return (
    <>
      {user ? (
        <Drawer.Screen name="Home" component={HomeScreen} />
      ) : (
        <Drawer.Screen name="Login" component={LoginScreen} />
      )}
    </>
  );
}
