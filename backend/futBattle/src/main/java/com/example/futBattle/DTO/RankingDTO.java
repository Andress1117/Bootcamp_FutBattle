package com.example.futBattle.DTO;

import com.example.futBattle.models.Game;
import com.example.futBattle.models.Player;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RankingDTO {

    private Integer id;
    private Integer score;
    private Integer idGame;
    private Integer idPlayer;

}
