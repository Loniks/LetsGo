package com.loniks.letsgo.repository;

import com.loniks.letsgo.domain.EventEntity;
import com.loniks.letsgo.domain.SponsorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Bondar Dmytro
 */
@Repository
@RepositoryRestResource(path = "events")
public interface EventRepository extends JpaRepository<EventEntity, Long> {

    @Query("select e from EventEntity e where e.numberOfTickets <= e.numberOfFreePlaces")
    List<EventEntity> findByNumberOfTicketsIsLessThanNumberOfFreePlaces();

    @Query("select e from EventEntity e where e.numberOfTickets <= e.numberOfFreePlaces and e.name like %:name%")
    List<EventEntity> findByNumberOfTicketsIsLessThanNumberOfFreePlacesAndByName(@Param("name") String name);

    List<EventEntity> findAllByOwner_Id(@Param("id") Long id);

}
