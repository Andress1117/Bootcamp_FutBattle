package com.example.futBattle.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.futBattle.models.Ranking;

public interface IRanking extends JpaRepository<Ranking, Integer> {

}
