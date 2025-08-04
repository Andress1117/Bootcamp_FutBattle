package com.example.futBattle.models;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;

import jakarta.persistence.OneToOne;
import jakarta.persistence.Entity;

import com.example.futBattle.models.Card;
import jakarta.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity(name = "statistics_card")
public class StatisticsCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "pac", columnDefinition = "CHAR(2)", nullable = false)
    private String pac;

    @Column(name = "sho", nullable = false, columnDefinition = "CHAR(2)")
    private String sho;

    @Column(name = "pas", nullable = false, columnDefinition = "CHAR(2)")
    private String pas;

    @Column(name = "dri", nullable = false, columnDefinition = "CHAR(2)")
    private String dri;

    @Column(name = "def", nullable = false, columnDefinition = "CHAR(2)")
    private String def;

    @Column(name = "phy", nullable = false, columnDefinition = "CHAR(2)")
    private String phy;

    @OneToOne
    @JoinColumn(name = "id_card", referencedColumnName = "id")
    private Card idCard;

}
