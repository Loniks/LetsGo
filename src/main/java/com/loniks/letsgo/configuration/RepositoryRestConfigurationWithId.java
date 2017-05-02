package com.loniks.letsgo.configuration;

import com.loniks.letsgo.domain.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

/**
 * Customized application configuration for Spring Data REST. Class is adding to JSON object of all entities instance Id.
 *
 * @author Dmytro Bondar
 * @see org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter
 */
@Configuration
public class RepositoryRestConfigurationWithId extends RepositoryRestConfigurerAdapter {
    /**
     * Method is changing config of {@code RepositoryRestConfigurerAdapter} for exposing instances.
     *
     * @param config
     * @see org.springframework.data.rest.core.config.RepositoryRestConfiguration
     */
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(AdminEntity.class);
        config.exposeIdsFor(EventEntity.class);
        config.exposeIdsFor(SponsorEntity.class);
        config.exposeIdsFor(TicketEntity.class);
        config.exposeIdsFor(VisitorEntity.class);
    }
}
