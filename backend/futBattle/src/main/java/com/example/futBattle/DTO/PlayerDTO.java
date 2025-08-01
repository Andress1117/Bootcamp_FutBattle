package com.example.futBattle.DTO;

import com.example.futBattle.models.ImageProfile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PlayerDTO {

    private Long id;
    private String name;
    private ImageProfile imageProfile;

}
