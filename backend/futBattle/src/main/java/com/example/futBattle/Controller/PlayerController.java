package com.example.futBattle.Controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.futBattle.Service.PlayerService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/player")
public class PlayerController {

    @Autowired
    private PlayerService service;

    // llamamos todos los player
    @GetMapping("/")
    public ResponseEntity<Object> getAllPlayer() {
        var data = service.getAllDataPlayer();
        return new ResponseEntity<Object>(data, HttpStatus.OK);
    }

    // Obtiene los datos de los jugadores relacionados a una sala
    @GetMapping("/{id}")
    public ResponseEntity<Object> getDataPlayerGame(@PathVariable int id) {
        var data = service.getDataPlayerGame(id);
        return new ResponseEntity<Object>(data, HttpStatus.OK);
    }

    // Guardar Player
    // @PostMapping("/")
    // public String savePlayer(@RequestBody String player) {

    //     var data = service.savePlayer(player);

    //     return "registo";
    // }

}
