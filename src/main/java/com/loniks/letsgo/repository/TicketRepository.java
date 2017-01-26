package com.loniks.letsgo.repository;

import com.loniks.letsgo.domain.EventEntity;
import com.loniks.letsgo.domain.TicketEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

/**
 * @author Bondar Dmytro
 */
@Repository
@RepositoryRestResource
public interface TicketRepository extends JpaRepository<TicketEntity,Long> {

}
