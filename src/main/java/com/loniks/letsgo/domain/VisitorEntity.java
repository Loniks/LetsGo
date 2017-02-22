package com.loniks.letsgo.domain;

import lombok.Data;
import org.hibernate.validator.constraints.Email;

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

    @Column(name = "name",nullable = false)
    private String name;

    @Email
    @Column(name = "email",nullable = false,unique = true)
    private String email;

    @Column(name = "password",nullable = false)
    private String password;

    @Column(name = "phone")
    private String phone;

    @Column(name = "status")
    private String status;
}
