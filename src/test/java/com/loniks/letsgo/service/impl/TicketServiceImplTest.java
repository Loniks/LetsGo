package com.loniks.letsgo.service.impl;

import com.loniks.letsgo.domain.EventEntity;
import com.loniks.letsgo.domain.TicketEntity;
import com.loniks.letsgo.domain.TicketStatus;
import com.loniks.letsgo.domain.VisitorEntity;
import com.loniks.letsgo.service.TicketService;
import org.docx4j.openpackaging.exceptions.Docx4JException;
import org.docx4j.openpackaging.exceptions.InvalidFormatException;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import java.io.File;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.doThrow;
import static org.powermock.api.mockito.PowerMockito.mock;
import static org.powermock.api.mockito.PowerMockito.when;

/**
 * @author Bondar Dmytro
 */
@RunWith(PowerMockRunner.class)
@PrepareForTest(WordprocessingMLPackage.class)
public class TicketServiceImplTest {
    private TicketService ticketService = new TicketServiceImpl();

    @Test(expected = IllegalArgumentException.class)
    public void testMakeDocumentWithNullTicket() throws Exception {
        ticketService.makeDocument(null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testMakeDocumentWithNullEvent() throws Exception {
        ticketService.makeDocument(new TicketEntity());
    }

    @Test(expected = RuntimeException.class)
    public void testMakeDocumentCantCreateFile() throws Exception {
        PowerMockito.mockStatic(WordprocessingMLPackage.class);
        when(WordprocessingMLPackage.createPackage()).thenThrow(InvalidFormatException.class);
        ticketService.makeDocument(getValidTicket());
    }

    private TicketEntity getValidTicket() {
        VisitorEntity visitorEntity = new VisitorEntity();
        EventEntity eventEntity = new EventEntity();
        eventEntity.setName("Bla");
        eventEntity.setAddress("Bla bla");
        eventEntity.setDuration("2 hours");
        TicketEntity ticketEntity = new TicketEntity(1l, TicketStatus.NEW, visitorEntity, eventEntity);
        return ticketEntity;
    }

    @Test(expected = RuntimeException.class)
    public void testMakeDocumentCantSaveFile() throws Exception {
        PowerMockito.mockStatic(WordprocessingMLPackage.class);
        WordprocessingMLPackage wordprocessingMLPackage = mock(WordprocessingMLPackage.class);
        doThrow(Docx4JException.class).when(wordprocessingMLPackage).save((File) any());
        when(WordprocessingMLPackage.createPackage()).thenReturn(wordprocessingMLPackage);
        ticketService.makeDocument(getValidTicket());
    }

    @Test
    public void testMakeDocumentSuccessfully() throws Exception {
        File file = ticketService.makeDocument(getValidTicket());
        Assert.assertNotNull(file);
    }

}