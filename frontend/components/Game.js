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
    Alert,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const cartasBase = [
    { nombre: 'Messi', stats: { PAC: 85, SHO: 92, PAS: 91, DRI: 95, DEF: 38, PHY: 65 } },
    { nombre: 'Cristiano', stats: { PAC: 89, SHO: 93, PAS: 82, DRI: 88, DEF: 35, PHY: 77 } },
    { nombre: 'Mbappe', stats: { PAC: 97, SHO: 89, PAS: 80, DRI: 92, DEF: 36, PHY: 76 } },
    { nombre: 'Modric', stats: { PAC: 76, SHO: 79, PAS: 89, DRI: 90, DEF: 72, PHY: 66 } },
    { nombre: 'Kanté', stats: { PAC: 80, SHO: 66, PAS: 77, DRI: 81, DEF: 87, PHY: 84 } },
    { nombre: 'Van Dijk', stats: { PAC: 78, SHO: 60, PAS: 71, DRI: 72, DEF: 91, PHY: 86 } },
    { nombre: 'De Bruyne', stats: { PAC: 76, SHO: 86, PAS: 92, DRI: 87, DEF: 64, PHY: 78 } },
    { nombre: 'Haaland', stats: { PAC: 91, SHO: 91, PAS: 65, DRI: 80, DEF: 45, PHY: 88 } },
    { nombre: 'Neymar', stats: { PAC: 91, SHO: 85, PAS: 84, DRI: 94, DEF: 32, PHY: 58 } },
    { nombre: 'Salah', stats: { PAC: 93, SHO: 86, PAS: 81, DRI: 90, DEF: 45, PHY: 75 } },
    { nombre: 'Ramos', stats: { PAC: 70, SHO: 70, PAS: 75, DRI: 65, DEF: 88, PHY: 85 } },
    { nombre: 'Lewandowski', stats: { PAC: 78, SHO: 91, PAS: 78, DRI: 82, DEF: 40, PHY: 82 } },
    { nombre: 'Alisson', stats: { PAC: 60, SHO: 40, PAS: 60, DRI: 50, DEF: 90, PHY: 80 } },
    { nombre: 'Kimmich', stats: { PAC: 75, SHO: 75, PAS: 85, DRI: 80, DEF: 85, PHY: 79 } },
    { nombre: 'Sancho', stats: { PAC: 89, SHO: 79, PAS: 84, DRI: 88, DEF: 40, PHY: 70 } },
    { nombre: 'Sterling', stats: { PAC: 93, SHO: 80, PAS: 75, DRI: 90, DEF: 35, PHY: 72 } },
    { nombre: 'Benzema', stats: { PAC: 79, SHO: 87, PAS: 82, DRI: 87, DEF: 40, PHY: 77 } },
    { nombre: 'Courtois', stats: { PAC: 45, SHO: 35, PAS: 75, DRI: 50, DEF: 95, PHY: 88 } },
    { nombre: 'Kroos', stats: { PAC: 54, SHO: 82, PAS: 95, DRI: 81, DEF: 71, PHY: 72 } },
    { nombre: 'Casemiro', stats: { PAC: 63, SHO: 73, PAS: 75, DRI: 72, DEF: 87, PHY: 91 } },
    { nombre: 'Hazard', stats: { PAC: 81, SHO: 84, PAS: 86, DRI: 91, DEF: 35, PHY: 66 } },
    { nombre: 'Son', stats: { PAC: 88, SHO: 87, PAS: 79, DRI: 86, DEF: 42, PHY: 68 } },
    { nombre: 'Griezmann', stats: { PAC: 82, SHO: 84, PAS: 82, DRI: 85, DEF: 52, PHY: 68 } },
    { nombre: 'Neuer', stats: { PAC: 55, SHO: 30, PAS: 85, DRI: 60, DEF: 92, PHY: 83 } },
    { nombre: 'Muller', stats: { PAC: 70, SHO: 85, PAS: 89, DRI: 81, DEF: 55, PHY: 72 } },
    { nombre: 'Goretzka', stats: { PAC: 76, SHO: 80, PAS: 78, DRI: 78, DEF: 80, PHY: 87 } },
    { nombre: 'Gnabry', stats: { PAC: 91, SHO: 80, PAS: 77, DRI: 85, DEF: 38, PHY: 70 } },
    { nombre: 'Sané', stats: { PAC: 95, SHO: 81, PAS: 76, DRI: 87, DEF: 35, PHY: 70 } },
    { nombre: 'Kane', stats: { PAC: 70, SHO: 91, PAS: 83, DRI: 82, DEF: 47, PHY: 82 } },
    { nombre: 'Mount', stats: { PAC: 78, SHO: 76, PAS: 82, DRI: 84, DEF: 64, PHY: 65 } },
    { nombre: 'Foden', stats: { PAC: 85, SHO: 78, PAS: 84, DRI: 90, DEF: 55, PHY: 61 } },
    { nombre: 'Grealish', stats: { PAC: 80, SHO: 74, PAS: 79, DRI: 89, DEF: 46, PHY: 65 } },
    { nombre: 'Alexander-Arnold', stats: { PAC: 78, SHO: 66, PAS: 89, DRI: 80, DEF: 76, PHY: 71 } },
    { nombre: 'Robertson', stats: { PAC: 85, SHO: 59, PAS: 81, DRI: 79, DEF: 78, PHY: 77 } },
    { nombre: 'Thiago', stats: { PAC: 69, SHO: 71, PAS: 91, DRI: 87, DEF: 75, PHY: 66 } },
    { nombre: 'Firmino', stats: { PAC: 76, SHO: 78, PAS: 84, DRI: 86, DEF: 61, PHY: 76 } },
    { nombre: 'Diaz', stats: { PAC: 89, SHO: 77, PAS: 78, DRI: 87, DEF: 35, PHY: 67 } },
    { nombre: 'Pedri', stats: { PAC: 79, SHO: 65, PAS: 86, DRI: 91, DEF: 59, PHY: 60 } },
    { nombre: 'Gavi', stats: { PAC: 84, SHO: 60, PAS: 81, DRI: 89, DEF: 64, PHY: 68 } },
    { nombre: 'Ter Stegen', stats: { PAC: 50, SHO: 25, PAS: 85, DRI: 65, DEF: 90, PHY: 78 } },
    { nombre: 'Araujo', stats: { PAC: 85, SHO: 55, PAS: 68, DRI: 70, DEF: 87, PHY: 88 } },
    { nombre: 'Frenkie', stats: { PAC: 78, SHO: 68, PAS: 87, DRI: 90, DEF: 78, PHY: 78 } },
    { nombre: 'Ansu Fati', stats: { PAC: 92, SHO: 79, PAS: 76, DRI: 88, DEF: 25, PHY: 55 } },
    { nombre: 'Ferran', stats: { PAC: 85, SHO: 80, PAS: 75, DRI: 82, DEF: 32, PHY: 65 } },
    { nombre: 'Donnarumma', stats: { PAC: 50, SHO: 30, PAS: 75, DRI: 55, DEF: 91, PHY: 85 } },
    { nombre: 'Marquinhos', stats: { PAC: 84, SHO: 55, PAS: 75, DRI: 78, DEF: 89, PHY: 85 } },
    { nombre: 'Verratti', stats: { PAC: 68, SHO: 62, PAS: 86, DRI: 92, DEF: 84, PHY: 61 } },
    { nombre: 'Hakimi', stats: { PAC: 91, SHO: 63, PAS: 80, DRI: 82, DEF: 75, PHY: 78 } },
    { nombre: 'Mendes', stats: { PAC: 88, SHO: 65, PAS: 83, DRI: 85, DEF: 72, PHY: 82 } },
    { nombre: 'Rafa Leao', stats: { PAC: 95, SHO: 78, PAS: 74, DRI: 89, DEF: 28, PHY: 82 } },
    { nombre: 'Theo', stats: { PAC: 93, SHO: 70, PAS: 75, DRI: 83, DEF: 68, PHY: 85 } },
    { nombre: 'Tonali', stats: { PAC: 72, SHO: 65, PAS: 84, DRI: 78, DEF: 82, PHY: 76 } },
    { nombre: 'Maignan', stats: { PAC: 60, SHO: 35, PAS: 80, DRI: 65, DEF: 89, PHY: 85 } },
    { nombre: 'Tomori', stats: { PAC: 89, SHO: 40, PAS: 65, DRI: 70, DEF: 84, PHY: 80 } },
    { nombre: 'Giroud', stats: { PAC: 58, SHO: 83, PAS: 71, DRI: 75, DEF: 39, PHY: 90 } },
    { nombre: 'Brahim', stats: { PAC: 82, SHO: 75, PAS: 80, DRI: 89, DEF: 40, PHY: 60 } }
];

const statsNames = ['PAC', 'SHO', 'PAS', 'DRI', 'DEF', 'PHY'];
const statsLabels = {
    PAC: 'Pace',
    SHO: 'Shooting',
    PAS: 'Passing',
    DRI: 'Dribbling',
    DEF: 'Defense',
    PHY: 'Physical'
};

const Game = ({ navigation, route }) => {
    const jugadoresLobby = route?.params?.players || [];
    
    // Estados del juego
    const [jugadores, setJugadores] = useState([]);
    const [rondaActual, setRondaActual] = useState(1);
    const [turnoActual, setTurnoActual] = useState(0);
    const [estadisticaRonda, setEstadisticaRonda] = useState('');
    const [cartasJugadas, setCartasJugadas] = useState([]);
    const [juegoTerminado, setJuegoTerminado] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [cartaSeleccionada, setCartaSeleccionada] = useState(null);
    const [esperandoProximaRonda, setEsperandoProximaRonda] = useState(false);
    const [ganadorRonda, setGanadorRonda] = useState(null);
    const [estadisticasFinales, setEstadisticasFinales] = useState([]);

    // Función para barajar cartas
    const barajarCartas = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Función para repartir cartas
    const repartirCartas = () => {
        const cartasBarajadas = barajarCartas(cartasBase);
        const jugadoresConCartas = jugadoresLobby.map((jugador, index) => ({
            ...jugador,
            cartas: cartasBarajadas.slice(index * 8, (index + 1) * 8),
            rondasGanadas: 0,
            cartasRestantes: 8
        }));
        return jugadoresConCartas;
    };

    // Inicializar juego
    useEffect(() => {
        const jugadoresIniciales = repartirCartas();
        setJugadores(jugadoresIniciales);
        
        // Elegir estadística aleatoria para la primera ronda
        const estatRandom = statsNames[Math.floor(Math.random() * statsNames.length)];
        setEstadisticaRonda(estatRandom);
    }, []);

    // Manejar selección de carta
    const seleccionarCarta = (carta) => {
        setCartaSeleccionada(carta);
        setModalVisible(true);
    };

    // Confirmar jugada de carta
    const confirmarCarta = () => {
        if (!cartaSeleccionada) return;

        const nuevasCartasJugadas = [...cartasJugadas, {
            jugador: jugadores[turnoActual],
            carta: cartaSeleccionada
        }];

        setCartasJugadas(nuevasCartasJugadas);

        // Remover carta del jugador
        const nuevosJugadores = [...jugadores];
        nuevosJugadores[turnoActual].cartas = nuevosJugadores[turnoActual].cartas.filter(
            carta => carta.nombre !== cartaSeleccionada.nombre
        );
        nuevosJugadores[turnoActual].cartasRestantes--;
        setJugadores(nuevosJugadores);

        setCartaSeleccionada(null);
        setModalVisible(false);

        // Verificar si todos han jugado
        if (nuevasCartasJugadas.length === jugadores.length) {
            determinarGanadorRonda(nuevasCartasJugadas);
        } else {
            // Siguiente turno
            setTurnoActual((turnoActual + 1) % jugadores.length);
        }
    };

    // Determinar ganador de la ronda
    const determinarGanadorRonda = (cartasRonda) => {
        let mejorCarta = cartasRonda[0];
        let mejorValor = cartasRonda[0].carta.stats[estadisticaRonda];

        cartasRonda.forEach(({ jugador, carta }) => {
            const valor = carta.stats[estadisticaRonda];
            if (valor > mejorValor) {
                mejorValor = valor;
                mejorCarta = { jugador, carta };
            }
        });

        // Actualizar rondasGanadas del ganador
        const nuevosJugadores = [...jugadores];
        const indexGanador = nuevosJugadores.findIndex(j => j.id === mejorCarta.jugador.id);
        nuevosJugadores[indexGanador].rondasGanadas++;
        setJugadores(nuevosJugadores);

        setGanadorRonda(mejorCarta);
        setEsperandoProximaRonda(true);

        // El ganador será el primero en jugar la próxima ronda
        setTurnoActual(indexGanador);
    };

    // Continuar a la siguiente ronda
    const siguienteRonda = () => {
        if (rondaActual >= 8) {
            // Juego terminado
            finalizarJuego();
            return;
        }

        setRondaActual(rondaActual + 1);
        setCartasJugadas([]);
        setGanadorRonda(null);
        setEsperandoProximaRonda(false);
        
        // Nueva estadística aleatoria
        const estatRandom = statsNames[Math.floor(Math.random() * statsNames.length)];
        setEstadisticaRonda(estatRandom);
    };

    // Finalizar juego
    const finalizarJuego = () => {
        const estadisticas = jugadores
            .sort((a, b) => b.rondasGanadas - a.rondasGanadas)
            .map((jugador, index) => ({
                ...jugador,
                posicion: index + 1
            }));
        
        setEstadisticasFinales(estadisticas);
        setJuegoTerminado(true);
    };

    // Volver al lobby
    const volverAlLobby = () => {
        navigation.goBack();
    };

    // Renderizar carta
    const renderCarta = (carta, seleccionable = false) => (
        <TouchableOpacity
            style={[styles.carta, seleccionable && styles.cartaSeleccionable]}
            onPress={seleccionable ? () => seleccionarCarta(carta) : null}
            disabled={!seleccionable}
        >
            <Text style={styles.nombreCarta}>{carta.nombre}</Text>
            <Image 
                source={{ uri: `../assets/cartas/${carta.nombre.toLowerCase().replace(/\s+/g, '')}.png` }}
                style={styles.imagenCarta}
                defaultSource={require('../assets/cartas/default.png')}
            />
            <View style={styles.statsContainer}>
                {Object.entries(carta.stats).map(([stat, value]) => (
                    <View key={stat} style={[
                        styles.statRow,
                        stat === estadisticaRonda && styles.statDestacado
                    ]}>
                        <Text style={styles.statLabel}>{stat}:</Text>
                        <Text style={[
                            styles.statValue,
                            stat === estadisticaRonda && styles.statValueDestacado
                        ]}>
                            {value}
                        </Text>
                    </View>
                ))}
            </View>
        </TouchableOpacity>
    );

    if (juegoTerminado) {
        return (
            <ImageBackground
                source={require('../assets/fondo.png')}
                style={styles.background}
                resizeMode="cover"
            >
                <View style={styles.overlay}>
                    <View style={styles.resultadosContainer}>
                        <Text style={styles.tituloResultados}>¡Juego Terminado!</Text>
                        <ScrollView style={styles.estadisticasScroll}>
                            {estadisticasFinales.map((jugador, index) => (
                                <View key={jugador.id} style={[
                                    styles.jugadorResultado,
                                    index === 0 && styles.ganador
                                ]}>
                                    <Text style={styles.posicion}>#{jugador.posicion}</Text>
                                    <Text style={styles.nombreResultado}>{jugador.name}</Text>
                                    <Text style={styles.rondasGanadas}>
                                        {jugador.rondasGanadas} rondas
                                    </Text>
                                    {index === 0 && <Ionicons name="trophy" size={24} color="#FFD700" />}
                                </View>
                            ))}
                        </ScrollView>
                        <TouchableOpacity style={styles.botonVolver} onPress={volverAlLobby}>
                            <Text style={styles.textoBotonVolver}>Volver al Lobby</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }

    return (
        <ImageBackground
            source={require('../assets/fondo.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                {/* Header del juego */}
                <View style={styles.header}>
                    <Text style={styles.rondaTexto}>Ronda {rondaActual}/8</Text>
                    <Text style={styles.estadisticaTexto}>
                        Estadística: {statsLabels[estadisticaRonda]}
                    </Text>
                </View>

                {/* Información de jugadores */}
                <ScrollView horizontal style={styles.jugadoresContainer}>
                    {jugadores.map((jugador, index) => (
                        <View key={jugador.id} style={[
                            styles.jugadorInfo,
                            index === turnoActual && !esperandoProximaRonda && styles.turnoActivo
                        ]}>
                            <Text style={styles.nombreJugador}>{jugador.name}</Text>
                            <Text style={styles.rondasInfo}>Rondas: {jugador.rondasGanadas}</Text>
                            <Text style={styles.cartasInfo}>Cartas: {jugador.cartasRestantes}</Text>
                        </View>
                    ))}
                </ScrollView>

                {/* Cartas jugadas en la ronda */}
                {cartasJugadas.length > 0 && (
                    <View style={styles.cartasJugadasContainer}>
                        <Text style={styles.cartasJugadasTitulo}>Cartas jugadas:</Text>
                        <ScrollView horizontal>
                            {cartasJugadas.map(({ jugador, carta }, index) => (
                                <View key={index} style={styles.cartaJugada}>
                                    <Text style={styles.jugadorCarta}>{jugador.name}</Text>
                                    {renderCarta(carta, false)}
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                )}

                {/* Ganador de ronda */}
                {ganadorRonda && (
                    <View style={styles.ganadorContainer}>
                        <Text style={styles.ganadorTexto}>
                            ¡{ganadorRonda.jugador.name} gana la ronda!
                        </Text>
                        <TouchableOpacity style={styles.siguienteRondaBoton} onPress={siguienteRonda}>
                            <Text style={styles.siguienteRondaTexto}>
                                {rondaActual >= 8 ? 'Ver Resultados' : 'Siguiente Ronda'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Cartas del jugador actual */}
                {!esperandoProximaRonda && jugadores.length > 0 && (
                    <View style={styles.cartasJugadorContainer}>
                        <Text style={styles.turnoTexto}>
                            Turno de: {jugadores[turnoActual]?.name}
                        </Text>
                        <View style={styles.cartasScrollContainer}>
                            <ScrollView 
                                horizontal 
                                style={styles.cartasScroll}
                                contentContainerStyle={styles.cartasScrollContent}
                                showsHorizontalScrollIndicator={false}
                            >
                                {jugadores[turnoActual]?.cartas.map((carta, index) => (
                                    <View key={index} style={styles.cartaWrapper}>
                                        {renderCarta(carta, true)}
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                )}

                {/* Modal de confirmación */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitulo}>¿Jugar esta carta?</Text>
                            {cartaSeleccionada && renderCarta(cartaSeleccionada, false)}
                            <View style={styles.modalBotones}>
                                <TouchableOpacity
                                    style={styles.botonCancelar}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.textoCancelar}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.botonConfirmar}
                                    onPress={confirmarCarta}
                                >
                                    <Text style={styles.textoConfirmar}>Confirmar</Text>
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
        paddingTop: 50,
        paddingHorizontal: 10,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 10,
        padding: 15,
    },
    rondaTexto: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    estadisticaTexto: {
        fontSize: 16,
        color: '#FFD700',
        fontWeight: '600',
    },
    jugadoresContainer: {
        maxHeight: 80,
        marginBottom: 15,
    },
    jugadorInfo: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 10,
        padding: 10,
        marginRight: 10,
        minWidth: 100,
        alignItems: 'center',
    },
    turnoActivo: {
        backgroundColor: '#FFD700',
        borderWidth: 2,
        borderColor: '#FFA500',
    },
    nombreJugador: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
    },
    rondasInfo: {
        fontSize: 10,
        color: '#666',
    },
    cartasInfo: {
        fontSize: 10,
        color: '#666',
    },
    cartasJugadasContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
    },
    cartasJugadasTitulo: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cartaJugada: {
        alignItems: 'center',
        marginRight: 10,
    },
    jugadorCarta: {
        color: '#fff',
        fontSize: 12,
        marginBottom: 5,
        textAlign: 'center',
    },
    ganadorContainer: {
        backgroundColor: 'rgba(0, 200, 0, 0.9)',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    ganadorTexto: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 15,
    },
    siguienteRondaBoton: {
        backgroundColor: '#4A90E2',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    siguienteRondaTexto: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cartasJugadorContainer: {
        flex: 1,
    },
    turnoTexto: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    cartasScrollContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartasScroll: {
        flex: 1,
        maxHeight: 250,
    },
    cartasScrollContent: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    cartaWrapper: {
        marginRight: 10,
    },
    carta: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        width: 120,
        minHeight: 180,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cartaSeleccionable: {
        borderWidth: 2,
        borderColor: '#4A90E2',
    },
    nombreCarta: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 5,
    },
    imagenCarta: {
        width: 60,
        height: 60,
        alignSelf: 'center',
        marginBottom: 10,
        borderRadius: 5,
    },
    statsContainer: {
        flex: 1,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3,
        paddingHorizontal: 5,
    },
    statDestacado: {
        backgroundColor: '#FFD700',
        borderRadius: 5,
        paddingVertical: 2,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    statValue: {
        fontSize: 12,
        color: '#333',
        fontWeight: 'bold',
    },
    statValueDestacado: {
        color: '#000',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        width: width * 0.8,
        maxWidth: 350,
    },
    modalTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    modalBotones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
        gap: 10,
    },
    botonCancelar: {
        backgroundColor: '#999',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
    },
    textoCancelar: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    botonConfirmar: {
        backgroundColor: '#4A90E2',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
    },
    textoConfirmar: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultadosContainer: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 20,
        padding: 20,
        margin: 20,
        alignItems: 'center',
    },
    tituloResultados: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    estadisticasScroll: {
        flex: 1,
        width: '100%',
        marginBottom: 20,
    },
    jugadorResultado: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    ganador: {
        backgroundColor: '#FFD700',
        borderWidth: 2,
        borderColor: '#FFA500',
    },
    posicion: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        minWidth: 30,
    },
    nombreResultado: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        flex: 1,
        marginLeft: 10,
    },
    rondasGanadas: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    botonVolver: {
        backgroundColor: '#4A90E2',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    textoBotonVolver: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Game;

