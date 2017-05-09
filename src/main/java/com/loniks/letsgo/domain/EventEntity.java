package com.loniks.letsgo.domain;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Date;

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
    private Date startDate;

    @Column(name = "duration")
    private String duration;

    @Column(name = "number_of_tickets", nullable = false)
    private Integer numberOfTickets;

    @Column(name = "number_of_free_places")
    private Integer numberOfFreePlaces;

    @Column(name = "status")
    private String status;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "owner")
    private SponsorEntity owner;
}
