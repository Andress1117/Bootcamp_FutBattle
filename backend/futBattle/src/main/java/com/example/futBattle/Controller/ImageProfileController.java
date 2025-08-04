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

import com.example.futBattle.DTO.GameDTO;
import com.example.futBattle.DTO.ImageProfileDTO;
import com.example.futBattle.Service.GameService;
import com.example.futBattle.Service.ImageProfileService;

@RestController
@RequestMapping("/api/v1/image")
public class ImageProfileController {
    @Autowired
    private ImageProfileService service;

    // llamamos todos las ImageProfile
    @GetMapping("/")
    public ResponseEntity<Object> getAllImage() {
        var data = service.getAllDataImageProfile();
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    // Guarda ImageProfile
    @PostMapping("/")
    public ResponseEntity<Object> saveImage(@RequestBody ImageProfileDTO imageProfileDTO) {
        var data = service.saveImageProfile(imageProfileDTO);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    // Eliminar ImageProfile
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteImage(@PathVariable Integer id) {
        var data = service.deleteImage(id);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
}
