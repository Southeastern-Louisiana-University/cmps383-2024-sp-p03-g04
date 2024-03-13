// App.js
import "react-native-gesture-handler";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './src/screens/LoginScreen';

const Drawer = createDrawerNavigator();

export default function App(){
  return (
    
    <NavigationContainer>
            <Drawer.Navigator initialRouteName="Login" screenOptions={{drawerActiveTintColor: "#1261E6"}}>
                <Drawer.Screen
                    name="Home"
                    component={LoginScreen}
                />
                <Drawer.Screen
                    name="Login"
                    component={LoginScreen}
                />
            </Drawer.Navigator>
    </NavigationContainer>
  );
}
