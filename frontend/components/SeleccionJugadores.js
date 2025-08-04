import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { saveGame } from '../components/src/api/GameApi';
const { width, height } = Dimensions.get('window');

const SeleccionarJugadores = ({ navigation }) => {
  const [selectedPlayers, setSelectedPlayers] = useState(null);

  const route = useRoute();
  const { username } = route.params;

  const playerOptions = [2, 3, 4, 5, 6, 7];

  const handlePlayerSelect = (count) => {
    setSelectedPlayers(count);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const formSaveGame = async () => {

    const game = {
      numPlayer: selectedPlayers,
      idPlayer: 10  // ID quemado por ahora
    };

    console.log(game)
    const response = await saveGame(game);

    console.log(response);
    console.log("Numero de player " + selectedPlayers)

    if (selectedPlayers) {
      navigation.navigate('Lobby', {
        players: selectedPlayers,
        username,
      });
    }

  };

  const renderPlayerImages = (count) => (
    <View style={styles.playersContainer}>
      {Array.from({ length: count }, (_, index) => (
        <View key={index} style={styles.playerSilhouette}>
          <View style={styles.head} />
          <View style={styles.body} />
        </View>
      ))}
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/fondo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.modalContainer}>
          <Text style={styles.title}>Selecciona el número de jugadores</Text>

          <View style={styles.gridContainer}>
            <View style={styles.row}>
              {playerOptions.slice(0, 4).map((count) => (
                <TouchableOpacity
                  key={count}
                  style={[
                    styles.playerOption,
                    selectedPlayers === count && styles.selectedOption,
                  ]}
                  onPress={() => handlePlayerSelect(count)}
                >
                  <Text style={styles.playerNumber}>{count}</Text>
                  {renderPlayerImages(count)}
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.rowSecond}>
              {playerOptions.slice(4).map((count) => (
                <TouchableOpacity
                  key={count}
                  style={[
                    styles.playerOption,
                    selectedPlayers === count && styles.selectedOption,
                  ]}
                  onPress={() => handlePlayerSelect(count)}
                >
                  <Text style={styles.playerNumber}>{count}</Text>
                  {renderPlayerImages(count)}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.continueButton,
              selectedPlayers && styles.continueButtonActive,
            ]}
            onPress={formSaveGame}
            disabled={!selectedPlayers}
          >
            <Text
              style={[
                styles.continueButtonText,
                selectedPlayers && styles.continueButtonTextActive,
              ]}
            >
              Continuar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: height * 0.06,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 10,
  },
  modalContainer: {
    width: width * 0.85,
    maxWidth: 400,
    backgroundColor: '#D9D9D9',
    borderRadius: 30,
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 40,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  gridContainer: {
    width: '100%',
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  rowSecond: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 60,
  },
  playerOption: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 8,
    borderRadius: 12,
    minWidth: 65,
    backgroundColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: 'rgba(74, 144, 226, 0.3)',
    borderWidth: 2,
    borderColor: '#D9D9D9',
    transform: [{ scale: 1.05 }],
  },
  playerNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  playersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 60,
    alignItems: 'center',
  },
  playerSilhouette: {
    alignItems: 'center',
    margin: 1,
  },
  head: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333',
    marginBottom: 1,
  },
  body: {
    width: 12,
    height: 10,
    backgroundColor: '#333',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  continueButton: {
    backgroundColor: '#555',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    opacity: 0.6,
    minWidth: 140,
  },
  continueButtonActive: {
    backgroundColor: '#555',
    opacity: 1,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  continueButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default SeleccionarJugadores;
