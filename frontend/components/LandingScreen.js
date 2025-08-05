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
    Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function LandingScreen({ navigation }) {
    const [username, setUsername] = useState('');

    const handlePlayPress = () => {
        if (username.trim() === '') {
            alert('Por favor, ingresa un nombre.');
            return;
        }
        navigation.navigate('SeleccionJugadores', { username });
    };

    return (
        <ImageBackground
            source={require('../assets/fondo.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.wrapper}>
                {/* Centered logo above the card */}
                <View style={styles.logoWrapper}>
                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                {/* Card below the logo */}
                <View style={styles.card}>
                    <View style={{ height: 150 }} />

                    <View style={styles.userInfo}>
                        <Image source={require('../assets/perfil.png')} style={styles.avatar} />
                        <View style={styles.inputWrapper}>
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

                    <TouchableOpacity style={styles.button} onPress={handlePlayPress}>
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
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    logoWrapper: {
        alignItems: 'center',
        marginBottom: -120, // Negative to overlap with card
        zIndex: 2, // On top of the card
    },
    logo: {
        width: width * 0.5,
        height: height * 0.25,
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
        zIndex: 1,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 12,
    },
    inputWrapper: {
        alignItems: 'flex-start',
    },
    input: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#333',
        padding: 0,
        backgroundColor: 'transparent',
        borderWidth: 0,
        ...(Platform.OS === 'web' && { outlineStyle: 'none' }),
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
