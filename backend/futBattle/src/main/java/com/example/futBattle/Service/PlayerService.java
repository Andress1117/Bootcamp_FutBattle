package com.example.futBattle.Service;

import com.example.futBattle.DTO.PlayerDTO;
import com.example.futBattle.DTO.responseDTO;
import com.example.futBattle.Repository.IPlayer;
import com.example.futBattle.models.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {

    @Autowired
    private IPlayer repository;

    // Lista todos los usuarios
    public List<Player> getAllDataPlayer() {
        return repository.findAll();
    }

    // Lista todos los usuarios relacionados a un juego
    public List<Player> getDataPlayerGame(int id) {
        return repository.dataPlayerGame(id);
    }

    // lista el Player segun el id
    public Optional<Player> findById(Integer id) {
        return repository.findById(id);
    }

    // Guarda y actuliza los datos de los player
    public responseDTO savePlayer(PlayerDTO playerDTO) {
        // Validación del nombre
        if (playerDTO.getName() == null || playerDTO.getName().isEmpty()
                || playerDTO.getName().length() > 50
                || !playerDTO.getName().matches("^[a-zA-Z\\s]+$")) {

            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "El nombre debe tener un máximo de 50 caracteres y solo puede contener letras y espacios.", null);
        }

        // Si es actualización
        if (playerDTO.getId() != null && playerDTO.getId() > 0) {
            Optional<Player> playerOpt = repository.findById(playerDTO.getId());

            if (!playerOpt.isPresent()) {
                return new responseDTO(
                        HttpStatus.NOT_FOUND.toString(),
                        "El jugador con ID " + playerDTO.getId() + " no existe", null);
            }

            Player player = playerOpt.get();
            player.setName(playerDTO.getName());

            repository.save(player);

            return new responseDTO(HttpStatus.OK.toString(), "Jugador actualizado exitosamente", null);
        }

        // Si es creación
        Player newPlayer = new Player();
        newPlayer.setName(playerDTO.getName());

        repository.save(newPlayer);

        return new responseDTO(HttpStatus.OK.toString(), "El jugador se guardó correctamente", newPlayer.getId());
    }

    // Eliminar player
    public responseDTO deletePlayer(Integer id) {
        if (!findById(id).isPresent()) {
            return new responseDTO(
                    HttpStatus.OK.toString(),
                    "El registro no existe.", null);
        } else {
            repository.deleteById(id);
            return new responseDTO(HttpStatus.OK.toString(), "Eliminado exitosamente", null);
        }
    }

    public Player convertToModel(PlayerDTO playerDTO) {

        Player player = new Player();
        player.setId(playerDTO.getId());
        player.setName(playerDTO.getName());

        return player;
    }

    public PlayerDTO convertToDTO(Player player) {
        return new PlayerDTO(
                player.getId(),
                player.getName());
    }

}
