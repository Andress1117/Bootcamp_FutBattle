package com.example.futBattle.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.futBattle.models.Player;

@Repository
public interface IPlayer extends JpaRepository<Player, Long> {

    @Query(value = "SELECT p.id, p.name, i.url, r.id_Game, p.id_image_profile FROM ranking r INNER JOIN player p ON r.id_Player = p.id INNER JOIN image_profile i ON i.id = p.id_image_profile WHERE  r.id_game = ?1", nativeQuery = true)
    List<Player> dataPlayerGame(int id);

}
