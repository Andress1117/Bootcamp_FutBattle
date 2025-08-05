package com.example.futBattle.Controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.futBattle.Service.PlayerService;

import com.example.futBattle.DTO.PlayerDTO;

@RestController
@RequestMapping("/api/v1/player")
public class PlayerController {

    @Autowired
    private PlayerService service;

    // llamamos todos los player
    @GetMapping("/")
    public ResponseEntity<Object> getAllPlayer() {
        var data = service.getAllDataPlayer();
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    // Obtiene los datos de los jugadores relacionados a una sala
    @GetMapping("/{id}")
    public ResponseEntity<Object> getDataPlayerGame(@PathVariable int id) {
        var data = service.getDataPlayerGame(id);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    // Guardar Player y actualiza Player
    @PostMapping("/")
    public ResponseEntity<Object> savePlayer(@RequestBody PlayerDTO player) {
        var data = service.savePlayer(player);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    //Eliminar Payer
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletePlayer(@PathVariable Integer id) {
        var data = service.deletePlayer(id);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

}
