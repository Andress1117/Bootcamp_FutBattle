package com.example.futBattle.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.futBattle.DTO.PlayerDTO;
import com.example.futBattle.DTO.RankingDTO;
import com.example.futBattle.Service.PlayerService;
import com.example.futBattle.Service.RankingService;

@RestController
@RequestMapping("/api/v1/ranking")
public class RankingController {

    @Autowired
    private RankingService service;

    // Guardar Ranking y actualiza Ranking
    @PostMapping("/")
    public ResponseEntity<Object> saveRanking(@RequestBody RankingDTO rankingDTO) {
        var data = service.saveRanking(rankingDTO);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    // Eliminar Ranking
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteRaking(@PathVariable Integer id) {
        var data = service.deleteRaking(id);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

}
