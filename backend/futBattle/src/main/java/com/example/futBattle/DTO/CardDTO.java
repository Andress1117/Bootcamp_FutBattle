package com.example.futBattle.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CardDTO {

    private Integer id;
    private String url;
    private String name;
    private StatisticsCardDTO statistics;
}
