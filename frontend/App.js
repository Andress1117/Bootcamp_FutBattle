import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingScreen from './components/LandingScreen';
import SeleccionJugadores from './components/SeleccionJugadores';
import SalaEspera from './components/SalaEspera';
import Juego from './components/Juego';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="SeleccionJugadores" component={SeleccionJugadores} />
        <Stack.Screen name="SalaEspera" component={SalaEspera} />
        <Stack.Screen name="Juego" component={Juego} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
