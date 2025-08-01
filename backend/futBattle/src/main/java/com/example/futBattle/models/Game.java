package com.example.futBattle.models;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

import com.example.futBattle.models.Player;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity(name = "game")
public class Game {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "num_player", nullable = false)
    private Integer name;

    @ManyToOne
    @JoinColumn(name = "id_player", nullable = false, referencedColumnName = "id")
    private Player idPlayer;

    @Column(name = "date", nullable = false)
    private LocalDateTime date;

}
