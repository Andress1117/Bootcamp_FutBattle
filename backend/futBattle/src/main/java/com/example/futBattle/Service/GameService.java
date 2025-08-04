package com.example.futBattle.Service;

import com.example.futBattle.DTO.GameDTO;
import com.example.futBattle.DTO.responseDTO;
import com.example.futBattle.Repository.IGame;
import com.example.futBattle.models.Game;
import com.example.futBattle.models.Player;
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
    public Optional<Game> findById(Integer id) {
        return repository.findById(id);
    }

    // Guarda datos de Game
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

        // Validar que el id del Player no sea nulo
        if (gameDTO.getIdPlayer() == null) {

            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El id del jugador no puede ser nulo");
        }

        Player player = new Player();

        player.setId(gameDTO.getIdPlayer());

        Game newGame = Game.builder()
                .numPlayer(gameDTO.getNumPlayer())
                .idPlayer(player)
                .build();

        repository.save(newGame);

        return new responseDTO(HttpStatus.OK.toString(), "El juego se creo correctamente");
    }

    // Eliminar Game
    public responseDTO deleteGame(Integer id) {
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

        // Crear un objeto Player con solo el ID
        Player player = new Player();
        player.setId(gameDTO.getIdPlayer());

        // Crear el objeto Game usando el builder de Lombok
        return Game.builder()
                .id(gameDTO.getId())
                .numPlayer(gameDTO.getNumPlayer())
                .idPlayer(player) // asignamos el objeto player creado
                .build();
    }

    public GameDTO convertToDTO(Game game) {
        return new GameDTO(
                game.getId(),
                game.getNumPlayer(),
                game.getIdPlayer().getId());
    }

}
