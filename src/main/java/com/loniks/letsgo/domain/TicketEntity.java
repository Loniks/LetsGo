package com.loniks.letsgo.domain;

import lombok.Data;

import javax.persistence.*;

/**
 * @author Bondar Dmytro
 */
@Data
@Entity
@Table(name = "tickets")
public class TicketEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="status")
    @Enumerated(EnumType.STRING)
    private TicketStatus status;

    @ManyToOne
    @JoinColumn(name = "owner")
    private VisitorEntity owner;

    @ManyToOne
    @JoinColumn(name = "event")
    private EventEntity event;


}
