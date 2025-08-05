package com.example.futBattle.Controller;

import com.example.futBattle.DTO.CardDTO;
import com.example.futBattle.Service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/card")
public class CardController {

    @Autowired
    private CardService service;

    // llamamos todos los datos de las cartas incluyendo sus estadisticas
    @GetMapping("/")
    public ResponseEntity<Object> getAllDataCard() {
        var data = service.dataCardAll();
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    // Guarda card con todo
    @PostMapping("/")
    public ResponseEntity<Object> saveCard(@RequestBody CardDTO cardDTO) {
        var data = service.saveCard(cardDTO);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    //Eliminar la carta
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteCard(@PathVariable Integer id) {
        var data = service.deleteCard(id);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

}
