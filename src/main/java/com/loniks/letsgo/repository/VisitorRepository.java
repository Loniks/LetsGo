package com.loniks.letsgo.repository;

import com.loniks.letsgo.domain.VisitorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

/**
 * @author Bondar Dmytro
 */
@Repository
@RepositoryRestResource(path = "visitors")
public interface VisitorRepository extends JpaRepository<VisitorEntity,Long> {
    VisitorEntity findOneByEmailAndPassword(@Param("email") String email, @Param("password") String password);

}
