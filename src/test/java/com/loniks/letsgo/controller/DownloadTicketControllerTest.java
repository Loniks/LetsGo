package com.loniks.letsgo.controller;

import com.loniks.letsgo.domain.TicketEntity;
import com.loniks.letsgo.repository.TicketRepository;
import com.loniks.letsgo.service.TicketService;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

import static java.io.File.createTempFile;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.eq;
import static org.mockito.Matchers.isNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * @author Bondar Dmytro
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DownloadTicketControllerTest.Config.class)
public class DownloadTicketControllerTest {

    @Autowired
    private DownloadTicketController controller;

    private static File success;

    private MockMvc mockMvc;

    @BeforeClass
    public static void init() throws IOException {
        success = createTempFile("Ticket", ".docx");
    }

    @Before
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }


    @Test
    public void testDownloadPDFResourceWithMissingId() throws Exception {
        mockMvc.perform(get("/api/tickets/download/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testDownloadPDFResourceWithCorrectId() throws Exception {
        mockMvc.perform(get("/api/tickets/download/2"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/msword"))
                .andExpect(content().bytes(Files.readAllBytes(success.toPath())));
    }

    @Test
    public void testDownloadPDFResourceWithoutId() throws Exception {
        mockMvc.perform(get("/api/tickets/download/"))
                .andExpect(status().isNotFound());
    }

    @Configuration
    @EnableWebMvc
    static class Config {

        @Bean
        public DownloadTicketController downloadTicketController() {
            return new DownloadTicketController();
        }

        @Bean
        public TicketService ticketService() throws IOException {
            TicketService ticketService = mock(TicketService.class);
            when(ticketService.makeDocument(any())).thenReturn(success);
            return ticketService;
        }

        @Bean
        public TicketRepository ticketRepository() {
            TicketRepository ticketRepository = mock(TicketRepository.class);
            when(ticketRepository.getOne(eq(1L))).thenReturn(null);
            when(ticketRepository.getOne(eq(2L))).thenReturn(new TicketEntity());
            when(ticketRepository.getOne((Long) isNull())).thenReturn(null);
            return ticketRepository;
        }
    }

}