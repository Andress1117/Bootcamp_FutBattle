package com.example.futBattle.Repository;

import com.example.futBattle.models.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICard extends JpaRepository<Card, Integer> {

}
