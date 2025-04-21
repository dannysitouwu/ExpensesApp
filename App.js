import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './layouts/contexts/AuthContext';

import SplashScreen from './layouts/SplashScreen';
import LogIn from './layouts/LogIn';
import SignUp from './layouts/SignUp';
import MainScreen from './layouts/MainScreen';
import Spent from './layouts/Spent';
import SpentTittle from './layouts/SpentTittle';
import Expenses from './layouts/Expenses';
import Statistics from './layouts/Statistics';
// import { UserProvider } from './contexts/UserContext';


const Stack = createStackNavigator();
export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Spent" component={Spent} options={{ headerShown: false }} />
        <Stack.Screen name="SpentTittle" component={SpentTittle} options={{ headerShown: false }} />
        <Stack.Screen name="Expenses" component={Expenses} options={{ headerShown: false }} />
        <Stack.Screen name="Statistics" component={Statistics} options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
}