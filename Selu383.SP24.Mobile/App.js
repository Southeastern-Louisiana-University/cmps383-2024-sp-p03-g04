// App.js
import "react-native-gesture-handler";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from "./src/screens/HomeScreen";

const Drawer = createDrawerNavigator();

export default function App(){
  return (
    
    <NavigationContainer>
            <Drawer.Navigator initialRouteName="Login" screenOptions={{drawerActiveTintColor: "#1261E6"}}>
                <Drawer.Screen
                    name="Home"
                    component={HomeScreen}
                />
                <Drawer.Screen
                    name="Book A Room"
                    component={HomeScreen}
                />
                <Drawer.Screen
                    name="Reservations"
                    component={HomeScreen}
                />
                <Drawer.Screen
                    name="Locations"
                    component={HomeScreen}
                />
                <Drawer.Screen
                    name="Services"
                    component={HomeScreen}
                />
                <Drawer.Screen
                    name="Settings"
                    component={HomeScreen}
                />
                <Drawer.Screen
                    name="About"
                    component={HomeScreen}
                />
                <Drawer.Screen
                    name="Contact Us"
                    component={HomeScreen}
                />
                <Drawer.Screen
                    name="Login"
                    component={LoginScreen}
                />
            </Drawer.Navigator>
    </NavigationContainer>
  );
}
