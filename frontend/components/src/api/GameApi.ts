import { ENDPOINT_GAME_SAVE } from "../api/constants/endPoinst";
import { IPlayerGame, IPlayerGameRanking } from "./types/IPlayer";

export const saveGame = async (credentials: IPlayerGame) => {

    try {
        const response = await fetch(`${ENDPOINT_GAME_SAVE}`, {
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
