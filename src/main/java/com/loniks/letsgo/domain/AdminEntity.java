package com.loniks.letsgo.domain;

import lombok.Data;
import org.hibernate.validator.constraints.Email;

import javax.persistence.*;

/**
 * @author Bondar Dmytro
 */
@Data
@Entity
@Table(name = "admins")
public class AdminEntity {
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

    @Column(name="role")
    @Enumerated(EnumType.STRING)
    private AdminRole role;

    @Column(name = "status")
    private String status;
}
