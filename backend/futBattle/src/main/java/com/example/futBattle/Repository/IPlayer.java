package com.example.futBattle.Repository;

import com.example.futBattle.models.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IPlayer extends JpaRepository<Player, Integer> {

    @Query(value = "SELECT p.id, p.name, i.url, r.id_Game, p.id_image_profile FROM ranking r INNER JOIN player p ON r.id_Player = p.id INNER JOIN image_profile i ON i.id = p.id_image_profile WHERE  r.id_game = ?1", nativeQuery = true)
    List<Player> dataPlayerGame(int id);

}
