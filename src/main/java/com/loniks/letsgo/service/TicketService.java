package com.loniks.letsgo.service;

import com.loniks.letsgo.domain.TicketEntity;

import java.io.File;
import java.io.IOException;

/**
 * @author Bondar Dmytro
 */
public interface TicketService {
    File makeDocument(TicketEntity ticketEntity) throws IOException;
}
