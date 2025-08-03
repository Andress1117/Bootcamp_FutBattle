// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingScreen from './components/LandingScreen';
import SeleccionarJugadores from './components/SeleccionJugadores';
import LobbyScreen from './components/LobbyScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="SeleccionarJugadores" component={SeleccionarJugadores} />
        <Stack.Screen name="Lobby" component={LobbyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
