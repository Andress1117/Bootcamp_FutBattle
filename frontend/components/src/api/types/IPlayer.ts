//interfas para crear un jugador
export interface INamePlayer {
    userName: string;
    idImagueProfile: number;
}

//interfas para crear un juego
export interface IPlayerGame {
    numPlayer: number;
    idPlayer: number;
}

//interfas para obtener ranking de un juego 
export interface IPlayerGameRanking {
    idGame: number;
}