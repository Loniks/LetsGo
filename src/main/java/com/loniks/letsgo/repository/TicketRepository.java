package com.loniks.letsgo.repository;

import com.loniks.letsgo.domain.EventEntity;
import com.loniks.letsgo.domain.TicketEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Bondar Dmytro
 */
@Repository
@RepositoryRestResource(path = "tickets")
public interface TicketRepository extends JpaRepository<TicketEntity,Long> {
    List<TicketEntity> findAllByOwner_Id(@Param("id") Long id);
}
