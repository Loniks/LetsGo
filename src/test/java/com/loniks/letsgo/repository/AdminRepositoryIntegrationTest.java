package com.loniks.letsgo.repository;

import com.loniks.letsgo.controller.DownloadTicketControllerTest;
import com.loniks.letsgo.domain.AdminEntity;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.nio.file.Files;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * @author Bondar Dmytro
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class AdminRepositoryIntegrationTest
{
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;

    @Before
    public void setUp() {
        this.mvc = MockMvcBuilders.webAppContextSetup(this.context).build();
    }

    @Test
    public void testFindOne(){
        AdminEntity adminEntity = adminRepository.findOne(1l);
        assertNotNull(adminEntity);
    }

    @Test
    public void testGetOne() throws Exception {
        mvc.perform(get("/api/admins/1")).andExpect(status().isOk())
                .andExpect(content().contentType("application/hal+json;charset=UTF-8"))
                .andExpect(content().json("{\n" +
                        "  \"name\" : \"Supper Admin\",\n" +
                        "  \"email\" : \"supper@test.com\",\n" +
                        "  \"password\" : \"supper\",\n" +
                        "  \"role\" : \"ROLE_SUPPER\",\n" +
                        "  \"status\" : \"enable\",\n" +
                        "  \"_links\" : {\n" +
                        "    \"self\" : {\n" +
                        "      \"href\" : \"http://localhost/api/admins/1\"\n" +
                        "    },\n" +
                        "    \"adminEntity\" : {\n" +
                        "      \"href\" : \"http://localhost/api/admins/1\"\n" +
                        "    }\n" +
                        "  }\n" +
                        "}"));
    }


}