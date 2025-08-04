import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ImageBackground,
    Modal,
    TextInput,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Lobby = ({ navigation, route }) => {

    const selectedPlayers = route?.params?.players || 5;
    const username = route?.params?.username || 'Usuario';

    const [players, setPlayers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [playerName, setPlayerName] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);

    useEffect(() => {
        const initialPlayers = Array.from({ length: selectedPlayers }, (_, index) => {
            if (index === 0) {
                return {
                    id: index,
                    name: username,
                    avatar: '👤',
                    isConnected: true,
                    isHost: true,
                    score: 0,
                };
            }
            return {
                id: index,
                name: null,
                avatar: null,
                isConnected: false,
                isHost: false,
                score: 0,
            };
        });
        setPlayers(initialPlayers);
    }, [selectedPlayers, username]);

    const handleBack = () => {
        if (navigation) {
            navigation.goBack();
        }
    };

    const handleSlotPress = (player) => {
        if (!player.isConnected) {
            setSelectedSlot(player.id);
            setModalVisible(true);
            setPlayerName('');
        }
    };

    const handleAddPlayer = () => {
        if (playerName.trim() === '') {
            Alert.alert('Error', 'Por favor ingresa un nombre válido');
            return;
        }

        const nameExists = players.some(p => p.name && p.name.toLowerCase() === playerName.trim().toLowerCase());
        if (nameExists) {
            Alert.alert('Error', 'Este nombre ya está en uso');
            return;
        }

        setPlayers(prevPlayers =>
            prevPlayers.map(player =>
                player.id === selectedSlot
                    ? { ...player, name: playerName.trim(), isConnected: true }
                    : player
            )
        );

        setModalVisible(false);
        setPlayerName('');
        setSelectedSlot(null);
    };

    const handleRemovePlayer = (playerId) => {
        if (playerId === 0) return;

        setPlayers(prevPlayers =>
            prevPlayers.map(player =>
                player.id === playerId
                    ? { ...player, name: null, isConnected: false }
                    : player
            )
        );
    };

    const handleContinue = () => {
        const allPlayersConnected = players.every(player => player.isConnected);

        if (allPlayersConnected) {
            const jugadoresConectados = players.filter(p => p.isConnected && p.name);
            navigation.navigate('Game', {
                players: jugadoresConectados,
            });
        } else {
            Alert.alert(
                'Jugadores incompletos',
                'Necesitas agregar todos los jugadores antes de iniciar el juego'
            );
        }
    };

    const renderPlayerSlot = (player) => {
        if (player.isConnected) {
            return (
                <TouchableOpacity
                    style={styles.playerSlot}
                    onLongPress={() => handleRemovePlayer(player.id)}
                    disabled={player.isHost}
                >
                    <View style={styles.playerAvatar}>
                        <View style={styles.avatarIcon}>
                            <Ionicons name="person" size={24} color="#4A90E2" />
                        </View>
                    </View>
                    <Text style={styles.playerName}>{player.name}</Text>
                    {player.isHost && <Text style={styles.hostText}>Host</Text>}
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity
                style={styles.emptySlot}
                onPress={() => handleSlotPress(player)}
            >
                <View style={styles.emptyAvatar}>
                    <Ionicons name="person-add" size={24} color="#999" />
                    <Text style={styles.plusText}>+</Text>
                </View>
                <Text style={styles.waitingText}>Tocar para agregar</Text>
            </TouchableOpacity>
        );
    };

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
                    <Text style={styles.title}>Sala de espera</Text>
                    <Text style={styles.subtitle}>Esperando jugadores...</Text>

                    <View style={styles.playersGrid}>
                        {players.map((player) => (
                            <View key={player.id} style={styles.playerContainer}>
                                {renderPlayerSlot(player)}
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.continueButton,
                            players.every(p => p.isConnected) && styles.continueButtonActive
                        ]}
                        onPress={handleContinue}
                        disabled={!players.every(p => p.isConnected)}
                    >
                        <Text style={[
                            styles.continueButtonText,
                            players.every(p => p.isConnected) && styles.continueButtonTextActive
                        ]}>
                            {players.every(p => p.isConnected) ? 'Iniciar Juego' : 'Faltan jugadores...'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Agregar Jugador</Text>

                            <TextInput
                                style={styles.textInput}
                                placeholder="Ingresa el nombre del jugador"
                                placeholderTextColor="#999"
                                value={playerName}
                                onChangeText={setPlayerName}
                                maxLength={20}
                                autoFocus={true}
                                onSubmitEditing={handleAddPlayer}
                            />

                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.acceptButton,
                                        playerName.trim() === '' && styles.acceptButtonDisabled
                                    ]}
                                    onPress={handleAddPlayer}
                                    disabled={playerName.trim() === ''}
                                >
                                    <Text style={[
                                        styles.acceptButtonText,
                                        playerName.trim() === '' && styles.acceptButtonTextDisabled
                                    ]}>
                                        Aceptar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
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
        width: width * 0.9,
        maxWidth: 450,
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
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
        marginBottom: 5,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    playersGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
        gap: 10,
    },
    playerContainer: {
        width: width * 0.15,
        maxWidth: 80,
        minWidth: 70,
    },
    playerSlot: {
        alignItems: 'center',
        backgroundColor: '#B8B8B8',
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 8,
        position: 'relative',
    },
    playerAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        position: 'relative',
    },
    avatarIcon: {
        backgroundColor: '#E8F4FD',
        borderRadius: 20,
        padding: 8,
    },
    hostText: {
        fontSize: 10,
        color: '#FFD700',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 2,
    },
    emptySlot: {
        alignItems: 'center',
        backgroundColor: '#A8A8A8',
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 8,
        borderWidth: 2,
        borderColor: '#999',
        borderStyle: 'dashed',
    },
    emptyAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        position: 'relative',
    },
    plusText: {
        position: 'absolute',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#999',
        right: -2,
        top: -2,
    },
    waitingText: {
        fontSize: 10,
        color: '#666',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    continueButton: {
        backgroundColor: '#555',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
        opacity: 0.6,
        minWidth: 180,
    },
    continueButtonActive: {
        backgroundColor: '#4A90E2',
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        padding: 30,
        width: width * 0.8,
        maxWidth: 350,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    textInput: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333',
        width: '100%',
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 10,
    },
    cancelButton: {
        backgroundColor: '#999',
        paddingVertical: 12,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    acceptButton: {
        backgroundColor: '#4A90E2',
        paddingVertical: 12,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
    },
    acceptButtonDisabled: {
        backgroundColor: '#ccc',
        opacity: 0.5,
    },
    acceptButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    acceptButtonTextDisabled: {
        color: '#888',
    },
    playerName: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        fontWeight: '500',
    },
});

export default Lobby;
