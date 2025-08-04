package com.example.futBattle.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.futBattle.DTO.GameDTO;
import com.example.futBattle.DTO.ImageProfileDTO;
import com.example.futBattle.DTO.PlayerDTO;
import com.example.futBattle.DTO.responseDTO;
import com.example.futBattle.Repository.IGame;
import com.example.futBattle.Repository.IImageProfile;
import com.example.futBattle.models.Game;
import com.example.futBattle.models.ImageProfile;
import com.example.futBattle.models.Player;

@Service
public class ImageProfileService {

    @Autowired
    private IImageProfile repository;

    // Lista todos los ImageProfile
    public List<ImageProfile> getAllDataImageProfile() {
        return repository.findAll();
    }

    // lista ImageProfile segun el id
    public Optional<ImageProfile> findById(Integer id) {
        return repository.findById(id);
    }

    // Guarda datos de ImageProfile
    public responseDTO saveImageProfile(ImageProfileDTO imageProfileDTO) {

        // Validación de la url para que no sea nulo
        if (imageProfileDTO.getUrl() == null) {

            return new responseDTO(
                    HttpStatus.BAD_REQUEST.toString(),
                    "La url de la imagen no puede ser nula", null);
        }

        // Si es actualización
        if (imageProfileDTO.getId() != null && imageProfileDTO.getId() > 0) {
            Optional<ImageProfile> imageOpt = repository.findById(imageProfileDTO.getId());

            if (!imageOpt.isPresent()) {
                return new responseDTO(
                        HttpStatus.NOT_FOUND.toString(),
                        "El jugador con ID " + imageProfileDTO.getId() + " no existe", null);
            }

            ImageProfile image = imageOpt.get();
            image.setUrl(imageProfileDTO.getUrl());

            repository.save(image);

            return new responseDTO(HttpStatus.OK.toString(), "Imaguen actualizado exitosamente", null);
        }

        ImageProfile image = new ImageProfile();
        image.setUrl(imageProfileDTO.getUrl());
        repository.save(image);

        return new responseDTO(HttpStatus.OK.toString(), "La imagen de perfil se creo exitosamente", image.getId());
    }

    // Eliminar Game ImageProfile
    public responseDTO deleteImage(Integer id) {
        if (!findById(id).isPresent()) {
            return new responseDTO(
                    HttpStatus.OK.toString(),
                    "El registro no existe.", null);
        } else {
            repository.deleteById(id);
            return new responseDTO(HttpStatus.OK.toString(), "Eliminado exitosamente", null);
        }
    }

    public ImageProfile convertToDTO(ImageProfileDTO imageProfileDTO) {
        return new ImageProfile(
                imageProfileDTO.getId(),
                imageProfileDTO.getUrl());
    }

    public ImageProfileDTO convertToDTO(ImageProfile imageProfile) {
        return new ImageProfileDTO(
                imageProfile.getId(),
                imageProfile.getUrl());
    }

}
