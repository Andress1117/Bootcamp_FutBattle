package com.example.futBattle.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.futBattle.Repository.IPlayer;
import com.example.futBattle.models.Player;

@Service
public class PlayerService {

    @Autowired
    private IPlayer repository;

    // Lista todos los usuarios
    public List<Player> getAllDataPlayer() {
        return repository.findAll();
    }

    // Lista todos los usuarios relacionados a un juego y rankin
    public List<Player> getDataPlayerGame(int id) {
        return repository.dataPlayerGame(id);
    }

    // Guarda los datos de los jugadores
    // public Player savePlayer(String player) {
    // return repository.save(player);
    // }

}
