package com.loniks.letsgo.domain;

import lombok.Data;

import javax.persistence.*;
import java.time.Duration;
import java.time.ZonedDateTime;
import java.util.Set;

/**
 * @author Bondar Dmytro
 */
@Data
@Entity
@Table(name = "events")
public class EventEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name",nullable = false)
    private String name;

    @Column(name = "description",length = 5000)
    private String description;

    @Column(name = "address",length = 1000)
    private String address;

    @Column(name = "start_date",nullable = false)
    private ZonedDateTime startDate;

    @Column(name = "duration")
    private Duration duration;

    @Column(name = "number_of_tickets", nullable = false)
    private Integer numberOfTickets;

    @Column(name = "number_of_free_places")
    private Integer numberOfFreePlaces;

    @Column(name = "status")
    private String status;

    @ManyToOne
    @JoinColumn(name = "owner")
    private SponsorEntity owner;
}
