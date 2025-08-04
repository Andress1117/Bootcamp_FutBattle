import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Aterrizaje from './components/Aterrizaje';
import SeleccionarJugadores from './components/SeleccionJugadores';
import SalaEspera from './components/SalaEspera';
import Juego from './components/Juego';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Aterrizaje" component={Aterrizaje} />
        <Stack.Screen name="SeleccionarJugadores" component={SeleccionarJugadores} />
        <Stack.Screen name="SalaEspera" component={SalaEspera} />
        <Stack.Screen name="Juego" component={Juego} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
