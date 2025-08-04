package com.example.futBattle.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.futBattle.DTO.PlayerDTO;
import com.example.futBattle.DTO.RankingDTO;
import com.example.futBattle.DTO.responseDTO;
import com.example.futBattle.Repository.IGame;
import com.example.futBattle.Repository.IPlayer;
import com.example.futBattle.Repository.IRanking;
import com.example.futBattle.models.Game;
import com.example.futBattle.models.ImageProfile;
import com.example.futBattle.models.Player;
import com.example.futBattle.models.Ranking;

@Service
public class RankingService {

    @Autowired
    private IRanking repository;

    @Autowired
    private IGame repositoryGame;

    @Autowired
    private IPlayer repositoryPlayer;

    // lista el Ranking segun el id
    public Optional<Ranking> findById(Integer id) {
        return repository.findById(id);
    }

    // Eliminar Ranking
    public responseDTO deleteRaking(Integer id) {
        if (!findById(id).isPresent()) {
            return new responseDTO(
                    HttpStatus.OK.toString(),
                    "El registro no existe.", null);
        } else {
            repository.deleteById(id);
            return new responseDTO(HttpStatus.OK.toString(), "Eliminado exitosamente", null);
        }
    }

    // Guarda y actuliza los datos de los Ranking
    public responseDTO saveRanking(RankingDTO rankingDTO) {

        // Validación del nombre
        if (rankingDTO.getIdGame() == null) {

            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El ID del juego no puede ir vacío ni ser inválido.", null);
        }

        // Validación del ID de imagen
        if (rankingDTO.getIdPlayer() == null) {

            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El ID del jugador no puede ir vacío ni ser inválido.", null);
        }

        // Buscar el Game
        Optional<Game> gameOpt = repositoryGame.findById(rankingDTO.getIdGame());

        if (!gameOpt.isPresent()) {
            return new responseDTO(
                    HttpStatus.NOT_FOUND.toString(),
                    "No se encontró el juego con ID " + rankingDTO.getIdGame(), null);
        }

        // Buscar el Player
        Optional<Player> playerOpt = repositoryPlayer.findById(rankingDTO.getIdPlayer());

        if (!playerOpt.isPresent()) {
            return new responseDTO(
                    HttpStatus.NOT_FOUND.toString(),
                    "No se el jugador con ID " + rankingDTO.getIdGame(), null);
        }

        // Si es actualización
        if (rankingDTO.getId() != null && rankingDTO.getId() > 0) {

            Optional<Ranking> rankingOpt = repository.findById(rankingDTO.getId());

            if (!playerOpt.isPresent()) {
                return new responseDTO(
                        HttpStatus.NOT_FOUND.toString(),
                        "El ranking con ID " + rankingDTO.getIdGame() + " no exite", null);
            }

            Ranking ranking = rankingOpt.get();
            ranking.setScore(rankingDTO.getScore());

            repository.save(ranking);

            return new responseDTO(HttpStatus.OK.toString(), "Ranking actualizado exitosamente", null);
        }

        // Si es creación
        Ranking newRanking = new Ranking();
        newRanking.setScore(rankingDTO.getScore());
        newRanking.setIdGame(gameOpt.get());
        newRanking.setIdPlayer(playerOpt.get());

        repository.save(newRanking);

        return new responseDTO(HttpStatus.OK.toString(), "El Ranking se guardó correctamente", newRanking.getId());
    }

}
