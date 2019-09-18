package com.loniks.letsgo.controller;

import com.loniks.letsgo.domain.TicketEntity;
import com.loniks.letsgo.repository.TicketRepository;
import com.loniks.letsgo.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

/**
 * @author Bondar Dmytro
 */
@RestController
public class DownloadTicketController {
    @Autowired
    private TicketService ticketService;

    @Autowired
    private TicketRepository ticketRepository;

    @RequestMapping("/api/tickets/download/{id}")
    public void downloadPDFResource(HttpServletResponse response,
                                    @PathVariable("id") Long id) throws IOException {
        TicketEntity ticketEntity = ticketRepository.getOne(id);
        if(ticketEntity!=null) {
            File ticket = ticketService.makeDocument(ticketEntity);
            response.setContentType("application/msword");
            response.addHeader("Content-Disposition", "attachment; filename=" + ticket.getName());
            response.setContentLength((int) ticket.length());
            InputStream inputStream = new BufferedInputStream(new FileInputStream(ticket));
            FileCopyUtils.copy(inputStream, response.getOutputStream());
            response.getOutputStream().flush();
        }else {
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
        }
    }
}
