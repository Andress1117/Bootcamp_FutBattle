package com.example.futBattle.Controller;

import com.example.futBattle.DTO.GameDTO;
import com.example.futBattle.Service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/game")
public class GameController {

    @Autowired
    private GameService service;

    // llamamos todos los Game
    @GetMapping("/")
    public ResponseEntity<Object> getAllGame() {
        var data = service.getAllDataGame();
        return new ResponseEntity<Object>(data, HttpStatus.OK);
    }

    // Guarda Game
    @PostMapping("/")
    public ResponseEntity<Object> saveGame(@RequestBody GameDTO gameDTO) {
        var data = service.saveGame(gameDTO);
        return new ResponseEntity<Object>(data, HttpStatus.OK);
    }

    //Eliminar game
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteGame(@PathVariable Long id) {
        var data = service.deleteGame(id);
        return new ResponseEntity<Object>(data, HttpStatus.OK);
    }

}
