package com.loniks.letsgo.domain;

import lombok.Data;

import javax.persistence.*;

/**
 * @author Bondar Dmytro
 */
@Data
@Entity
@Table(name = "visitors")
public class VisitorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
