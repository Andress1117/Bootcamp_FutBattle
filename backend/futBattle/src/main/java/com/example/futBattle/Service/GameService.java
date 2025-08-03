package com.example.futBattle.Service;

import com.example.futBattle.DTO.GameDTO;
import com.example.futBattle.DTO.responseDTO;
import com.example.futBattle.Repository.IGame;
import com.example.futBattle.models.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GameService {

    @Autowired
    private IGame repository;

    // Lista todos los Game
    public List<Game> getAllDataGame() {
        return repository.findAll();
    }

    // lista Game segun el id
    public Optional<Game> findById(Long id) {
        return repository.findById(id);
    }

    //Guarda datos de Game
    public responseDTO saveGame(GameDTO gameDTO) {

        // Validación del numero de Player no sea nulo
        if (gameDTO.getNumPlayer() == null) {

            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El numero de jugadores no puede ser nulo ");
        }

        // Validación del numero de Player no sea menor que dos
        if (gameDTO.getNumPlayer() < 2) {

            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El numero de jugadores debe ser mayor o igual que dos");
        }

        // Validación del numero de Player no sea mayor que siete
        if (gameDTO.getNumPlayer() > 7) {

            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El numero de jugadores debe ser mayor que siete");
        }

        // Creación de Game
        Game newGame = new Game();
        newGame.setNumPlayer(gameDTO.getNumPlayer());

        repository.save(newGame);

        return new responseDTO(HttpStatus.OK.toString(), "El juego se creo correctamente");
    }

    //Eliminar Game
    public responseDTO deleteGame(Long id) {
        if (!findById(id).isPresent()) {
            return new responseDTO(
                    HttpStatus.OK.toString(),
                    "El registro no existe.");
        } else {
            repository.deleteById(id);
            return new responseDTO(HttpStatus.OK.toString(), "Eliminado exitosamente");
        }
    }

    public Game convertToModel(GameDTO gameDTO) {
        return Game.builder()
                .id(gameDTO.getId())
                .numPlayer(gameDTO.getNumPlayer())
                .build();
    }

    public GameDTO convertToDTO(Game game) {
        return new GameDTO(
                game.getId(),
                game.getNumPlayer());
    }

}
