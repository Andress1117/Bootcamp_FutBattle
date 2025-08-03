package com.example.futBattle.Repository;

import com.example.futBattle.models.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IGame extends JpaRepository<Game, Long> {
}
