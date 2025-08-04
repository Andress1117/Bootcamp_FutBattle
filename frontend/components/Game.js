import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ImageBackground,
    Modal,
    ScrollView,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Game = ({ navigation, route }) => {
    // Obtener los jugadores del Lobby
    const playerNames = route?.params?.players || [];
    
    const [currentRound, setCurrentRound] = useState(1);
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [playerCards, setPlayerCards] = useState([]);

    // Cartas de ejemplo (podrías tener más cartas disponibles)
    const availableCards = [
        { id: 1, name: 'Andrés M.', rating: 84, position: 'DEL', image: require('../assets/cards/card1.png') },
        { id: 2, name: 'Valverde', rating: 88, position: 'MED', image: require('../assets/cards/card2.png') },
        { id: 3, name: 'Pedri', rating: 68, position: 'MED', image: require('../assets/cards/card3.png') },
        { id: 4, name: 'Benzema', rating: 95, position: 'DEL', image: require('../assets/cards/card4.png') },
        { id: 5, name: 'Mané', rating: 74, position: 'EXT', image: require('../assets/cards/card5.png') },
        { id: 6, name: 'Cristiano', rating: 91, position: 'DEL', image: require('../assets/cards/card6.png') },
        { id: 7, name: 'Lewandowski', rating: 84, position: 'DEL', image: require('../assets/cards/card7.png') },
        { id: 8, name: 'Modrić', rating: 88, position: 'MED', image: require('../assets/cards/card8.png') },
    ];

    useEffect(() => {
        // Inicializar jugadores con sus cartas
        initializePlayers();
    }, [playerNames]);

    const initializePlayers = () => {
        const gamePlayers = playerNames.map((name, index) => {
            // Asignar cartas aleatorias a cada jugador (por ejemplo, 7 cartas)
            const shuffledCards = [...availableCards].sort(() => Math.random() - 0.5);
            const playerCards = shuffledCards.slice(0, 7);
            
            return {
                id: index,
                name: name,
                cards: playerCards,
                score: 0,
                isCurrentPlayer: index === 0, // El primer jugador empieza
            };
        });
        
        setPlayers(gamePlayers);
        // Mostrar las cartas del jugador actual (primer jugador)
        if (gamePlayers.length > 0) {
            setPlayerCards(gamePlayers[0].cards);
        }
    };

    const handleBack = () => {
        if (navigation) {
            navigation.goBack();
        }
    };

    const handlePlayerPress = (player) => {
        setSelectedPlayer(player);
        setPlayerCards(player.cards);
    };

    const handleSendCard = () => {
        // Lógica para enviar carta
        console.log('Enviando carta...');
        // Aquí implementarías la lógica del juego
    };

    const getPlayerPosition = (index, total) => {
        // Calcular posiciones alrededor del centro
        const centerX = width * 0.5;
        const centerY = height * 0.4;
        const radius = Math.min(width, height) * 0.25;
        
        if (total === 1) return { x: centerX - 40, y: centerY - 100 };
        
        const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle) - 40;
        const y = centerY + radius * Math.sin(angle) - 40;
        
        return { x, y };
    };

    const renderPlayerCards = () => {
        return (
            <ScrollView 
                horizontal 
                style={styles.cardsContainer}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cardsScrollContent}
            >
                {playerCards.map((card, index) => (
                    <TouchableOpacity 
                        key={card.id} 
                        style={[styles.card, { marginLeft: index > 0 ? -20 : 0 }]}
                        onPress={() => console.log('Carta seleccionada:', card.name)}
                    >
                        <View style={styles.cardContent}>
                            <Text style={styles.cardRating}>{card.rating}</Text>
                            <Text style={styles.cardPosition}>{card.position}</Text>
                            <View style={styles.cardImageContainer}>
                                <Ionicons name="person" size={30} color="#4A90E2" />
                            </View>
                            <Text style={styles.cardName}>{card.name}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    };

    const renderPlayer = (player, index) => {
        const position = getPlayerPosition(index, players.length);
        const isCurrentPlayer = player.isCurrentPlayer;
        
        return (
            <View 
                key={player.id} 
                style={[
                    styles.playerContainer, 
                    { 
                        left: position.x, 
                        top: position.y,
                        backgroundColor: isCurrentPlayer ? '#4A90E2' : '#B8B8B8'
                    }
                ]}
            >
                <TouchableOpacity 
                    style={styles.playerAvatar}
                    onPress={() => handlePlayerPress(player)}
                >
                    <Ionicons name="person" size={20} color="#fff" />
                </TouchableOpacity>
                <Text style={[styles.playerName, { color: isCurrentPlayer ? '#fff' : '#333' }]}>
                    {player.name}
                </Text>
                
                {/* Cartas del jugador (solo mostrar cantidad) */}
                <View style={styles.playerCardsStack}>
                    {[...Array(Math.min(player.cards.length, 5))].map((_, cardIndex) => (
                        <View 
                            key={cardIndex}
                            style={[
                                styles.miniCard,
                                { 
                                    left: cardIndex * 2,
                                    top: cardIndex * -1,
                                    zIndex: cardIndex
                                }
                            ]}
                        />
                    ))}
                </View>
            </View>
        );
    };

    return (
        <ImageBackground
            source={require('../assets/fondo.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                {/* Botón de regreso */}
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>

                {/* Indicador de ronda */}
                <View style={styles.roundIndicator}>
                    <Text style={styles.roundText}>Ronda {currentRound}</Text>
                </View>

                {/* Jugadores posicionados alrededor */}
                {players.map((player, index) => renderPlayer(player, index))}

                {/* Centro del juego */}
                <View style={styles.gameCenter}>
                    <View style={styles.centerArea}>
                        <Ionicons name="trophy" size={40} color="#FFD700" />
                    </View>
                </View>

                {/* Información del jugador actual */}
                <View style={styles.currentPlayerInfo}>
                    <Text style={styles.currentPlayerText}>
                        {selectedPlayer ? selectedPlayer.name : playerNames[0]}
                    </Text>
                </View>

                {/* Cartas del jugador */}
                <View style={styles.bottomSection}>
                    {renderPlayerCards()}
                    
                    <TouchableOpacity 
                        style={styles.sendButton}
                        onPress={handleSendCard}
                    >
                        <Text style={styles.sendButtonText}>Enviar carta</Text>
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
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        top: height * 0.06,
        left: 20,
        zIndex: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 20,
        padding: 10,
    },
    roundIndicator: {
        position: 'absolute',
        top: height * 0.15,
        alignSelf: 'center',
        left: width * 0.5 - 50,
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    roundText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    playerContainer: {
        position: 'absolute',
        alignItems: 'center',
        backgroundColor: '#B8B8B8',
        borderRadius: 15,
        padding: 10,
        minWidth: 80,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    playerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    playerName: {
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 5,
    },
    playerCardsStack: {
        position: 'relative',
        width: 30,
        height: 20,
    },
    miniCard: {
        position: 'absolute',
        width: 25,
        height: 18,
        backgroundColor: '#FFD700',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    gameCenter: {
        position: 'absolute',
        top: height * 0.4 - 40,
        left: width * 0.5 - 40,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerArea: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#FFD700',
    },
    currentPlayerInfo: {
        position: 'absolute',
        bottom: height * 0.35,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    currentPlayerText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    bottomSection: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingTop: 15,
        paddingBottom: 30,
        paddingHorizontal: 10,
    },
    cardsContainer: {
        maxHeight: 120,
        marginBottom: 15,
    },
    cardsScrollContent: {
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    card: {
        width: 70,
        height: 100,
        backgroundColor: '#FFD700',
        borderRadius: 8,
        padding: 5,
        marginHorizontal: 2,
        borderWidth: 2,
        borderColor: '#FFA500',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    cardContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardRating: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
    },
    cardPosition: {
        fontSize: 8,
        color: '#666',
        fontWeight: '500',
    },
    cardImageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 15,
        width: '90%',
    },
    cardName: {
        fontSize: 8,
        color: '#333',
        textAlign: 'center',
        fontWeight: '500',
        numberOfLines: 1,
    },
    sendButton: {
        backgroundColor: '#4A90E2',
        borderRadius: 15,
        paddingVertical: 12,
        paddingHorizontal: 30,
        alignSelf: 'center',
        marginTop: 5,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default Game;