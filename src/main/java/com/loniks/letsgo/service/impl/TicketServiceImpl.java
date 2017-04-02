package com.loniks.letsgo.service.impl;

import com.loniks.letsgo.domain.TicketEntity;
import com.loniks.letsgo.service.TicketService;
import org.docx4j.jaxb.Context;
import org.docx4j.openpackaging.exceptions.Docx4JException;
import org.docx4j.openpackaging.exceptions.InvalidFormatException;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.docx4j.openpackaging.parts.WordprocessingML.MainDocumentPart;
import org.docx4j.wml.ObjectFactory;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

/**
 * @author Bondar Dmytro
 */
@Service
public class TicketServiceImpl implements TicketService {
    @Override
    public File makeDocument(TicketEntity ticketEntity) throws IOException {
        final File generated = File.createTempFile(String.format("Ticket_%s",ticketEntity.getId()), ".docx");
        WordprocessingMLPackage wordMLPackage = null;
        try {
            wordMLPackage = WordprocessingMLPackage.createPackage();
        } catch (InvalidFormatException e) {
            throw new RuntimeException("Can't create file", e);
        }
        MainDocumentPart mdp = wordMLPackage.getMainDocumentPart();
        ObjectFactory factory = Context.getWmlObjectFactory();
        mdp.addParagraphOfText(String.format("Ticket # %s",ticketEntity.getId()));
        mdp.addObject(factory.createBr());
        mdp.addObject(factory.createBr());
        mdp.addParagraphOfText(String.format("Event name: %s",ticketEntity.getEvent().getName()));
        mdp.addObject(factory.createBr());
        mdp.addObject(factory.createBr());
        mdp.addParagraphOfText(String.format("Location: %s",ticketEntity.getEvent().getAddress()));
        mdp.addObject(factory.createBr());
        mdp.addObject(factory.createBr());
        mdp.addParagraphOfText(String.format("Duration: %s hours",ticketEntity.getEvent().getDuration().toHours()));
        try {
            wordMLPackage.save(generated);
        } catch (Docx4JException e) {
            throw new RuntimeException("Can't save file", e);
        }
        return generated;
    }

}

