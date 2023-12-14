package com.unidev.universe.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.unidev.universe.entities.GroupEvent;
import com.unidev.universe.services.EventService;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping
    public List<GroupEvent> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/{eventId}")
    public GroupEvent getEventById(@PathVariable Long eventId) {
        return eventService.getEventById(eventId);
    }

    @PostMapping
    public ResponseEntity<GroupEvent> createEvent(@RequestBody GroupEvent event) {
        GroupEvent createdEvent = eventService.createEvent(event);
        return new ResponseEntity<>(createdEvent, HttpStatus.CREATED);
    }

    //TODO: Authorization with logged users, only specific users can create, edit and delete events!

    public ResponseEntity<GroupEvent> updateEvent(@PathVariable Long eventId, @RequestBody GroupEvent updatedEvent) {
        GroupEvent result = eventService.updateEvent(eventId, updatedEvent);

        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<Void> deleteEvent(@PathVariable Long eventId) {
        eventService.deleteEvent(eventId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
