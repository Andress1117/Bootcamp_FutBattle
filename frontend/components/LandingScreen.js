import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    TextInput,
} from 'react-native';

import { savePlayer } from '../components/src/api/PlayerApi';

import { INamePlayer } from "../components/src/api/types/IPlayer";

const { width, height } = Dimensions.get('window');

export default function LandingScreen({ navigation }) { // <-- Recibe navigation

    const [username, setUsername] = useState('');

    const formSavePlayer = async () => {

        if (username.trim() === '') {
            alert('Por favor, ingresa un nombre.');
            return;
        }

        const player = {
            name: username.trim(),
            imageProfileId: 1 // ID quemado por ahora
        };

        const response = await savePlayer(player);

        console.log(response);

        navigation.navigate('SeleccionarJugadores', { username });

    };

    return (
        <ImageBackground
            source={require('../assets/fondo.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                {/* Logo centrado encima del card */}
                <Image
                    source={require('../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <View style={styles.card}>
                    {/* Espacio para que el logo no tape contenido */}
                    <View style={{ height: 150 }} />

                    <View style={styles.userSection}>
                        <Image source={require('../assets/perfil.png')} style={styles.avatar} />
                        <View style={styles.nameContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Nombre de usuario"
                                placeholderTextColor="#888"
                                value={username}
                                onChangeText={setUsername}
                            />
                            <View style={styles.underline} />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={formSavePlayer}
                    >
                        <Text style={styles.buttonText}>Jugar partida</Text>
                    </TouchableOpacity>


                </View>
            </View>
        </ImageBackground>
    );
}


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
    },
    logo: {
        width: 350,
        height: 350,
        position: 'absolute',
        top: '14%',
        left: width / 2 - 175, // 350 / 2
        zIndex: 2,
    },
    card: {
        width: width * 0.35,
        backgroundColor: '#D9D9D9',
        borderRadius: 30,
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 50,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
        marginTop: 120,
    },
    userSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 12,
    },
    nameContainer: {
        alignItems: 'flex-start',
    },
    input: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#333',
        padding: 0,
        backgroundColor: 'transparent', // ← sin fondo
        borderWidth: 0, // ← sin bordes
        outlineStyle: 'none',
    },
    underline: {
        height: 1,
        width: 140,
        backgroundColor: '#888',
        marginTop: 4,
    },
    button: {
        backgroundColor: '#555',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
        opacity: 0.85,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontStyle: 'italic',
    },
});
