package com.example.futBattle.Service;

import com.example.futBattle.DTO.CardDTO;
import com.example.futBattle.DTO.responseDTO;
import com.example.futBattle.Repository.ICard;
import com.example.futBattle.models.Card;
import com.example.futBattle.models.StatisticsCard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CardService {

    @Autowired
    private ICard repository;

    // Lista las Card con sus estadisticas
    public List<Card> dataCardAll() {
        return repository.findAll();
    }

    //Guarda las cartas con sus estadisticas
    public responseDTO saveCard(CardDTO cardDTO) {

        // Validación del nombre que no sea nulo o vacio
        if (cardDTO.getName() == null || cardDTO.getName().trim().isEmpty()) {
            return new responseDTO(HttpStatus.BAD_REQUEST.toString(), "El nombre no puede estar vacío", null);
        }

        //validación para el numero de caracteres maximo por nombre
        if (cardDTO.getName().length() > 50) {
            return new responseDTO(HttpStatus.BAD_REQUEST.toString(), "El nombre no puede tener más de 50 caracteres", null);
        }

        // Validación de la url que no sea nulo o vacio
        if (cardDTO.getUrl() == null || cardDTO.getUrl().trim().isEmpty()) {
            return new responseDTO(HttpStatus.BAD_REQUEST.toString(), "La URL no puede estar vacía", null);
        }

        //validación para el numero de caracteres maximo por url
        if (cardDTO.getUrl().length() > 255) {
            return new responseDTO(HttpStatus.BAD_REQUEST.toString(), "La URL no puede tener más de 255 caracteres", null);
        }

        // Validación de las estadisticas para que no sean nulas
        if (cardDTO.getStatistics() == null) {
            return new responseDTO(HttpStatus.BAD_REQUEST.toString(), "Las estadísticas no pueden ser nulas", null);
        }

        // Validaciones de estadísticas
        if (isEmpty(cardDTO.getStatistics().getPac())) return error("El campo PAC es obligatorio");
        if (isEmpty(cardDTO.getStatistics().getSho())) return error("El campo SHO es obligatorio");
        if (isEmpty(cardDTO.getStatistics().getPas())) return error("El campo PAS es obligatorio");
        if (isEmpty(cardDTO.getStatistics().getDri())) return error("El campo DRI es obligatorio");
        if (isEmpty(cardDTO.getStatistics().getDef())) return error("El campo DEF es obligatorio");
        if (isEmpty(cardDTO.getStatistics().getPhy())) return error("El campo PHY es obligatorio");

        // Crear entidades
        Card card = new Card();
        card.setName(cardDTO.getName());
        card.setUrl(cardDTO.getUrl());

        StatisticsCard statistics = new StatisticsCard();
        statistics.setPac(cardDTO.getStatistics().getPac());
        statistics.setSho(cardDTO.getStatistics().getSho());
        statistics.setPas(cardDTO.getStatistics().getPas());
        statistics.setDri(cardDTO.getStatistics().getDri());
        statistics.setDef(cardDTO.getStatistics().getDef());
        statistics.setPhy(cardDTO.getStatistics().getPhy());

        card.setStatistics(statistics);
        statistics.setCard(card);

        repository.save(card);

        return new responseDTO(HttpStatus.OK.toString(), "La carta se guardó exitosamente", null);
    }

    // lista carta segun el id
    public Optional<Card> findById(Integer id) {
        return repository.findById(id);
    }

    //Borrar Carta
    public responseDTO deleteCard(Integer id) {
        if (!findById(id).isPresent()) {
            return new responseDTO(
                    HttpStatus.OK.toString(),
                    "El registro no existe.", null);
        } else {
            repository.deleteById(id);
            return new responseDTO(HttpStatus.OK.toString(), "Eliminado exitosamente", null);
        }
    }


    // Método generico para validar si un string está vacío
    private boolean isEmpty(String value) {
        return value == null || value.trim().isEmpty();
    }

    // Método generico para mostrar lo errores
    private responseDTO error(String mensaje) {
        return new responseDTO(HttpStatus.BAD_REQUEST.toString(), mensaje, null);
    }

}
