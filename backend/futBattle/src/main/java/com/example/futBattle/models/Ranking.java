package com.example.futBattle.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

import com.example.futBattle.models.Game;
import com.example.futBattle.models.Player;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity(name = "ranking")
public class Ranking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "score", nullable = false)
    private Integer score;

    @ManyToOne
    @JoinColumn(name = "id_game", nullable = false, referencedColumnName = "id")
    private Game idGame;

    @ManyToOne
    @JoinColumn(name = "id_player", nullable = false, referencedColumnName = "id")
    private Player idPlayer;

}
