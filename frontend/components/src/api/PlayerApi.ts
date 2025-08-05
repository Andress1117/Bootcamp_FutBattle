import { ENDPOINT_Get_ALL_PLAYER, ENDPOINT_Get_ALL_GAME_RANKING, ENDPOINT_PLAYER_SAVE } from "../api/constants/endPoinst";
import { INamePlayer, IPlayerGame, IPlayerGameRanking } from "./types/IPlayer";

export const savePlayer = async (credentials: INamePlayer) => {

    try {
        const response = await fetch(`${ENDPOINT_PLAYER_SAVE}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(credentials),
            
        });

        let data = await response.json();

        return data;


    } catch (error) {
        return { error: "Error en la conexión" };
    }
};
