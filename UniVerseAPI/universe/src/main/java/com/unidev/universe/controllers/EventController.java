package com.unidev.universe.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.unidev.universe.entities.GroupEvent;
import com.unidev.universe.services.EventService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/events")
public class EventController {
    private final EventService eventService;

    @GetMapping
    public List<GroupEvent> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/trending")
    public List<GroupEvent> getTrendingEvents() {
        return eventService.getTrendingEvents();
    }

    @GetMapping("/{eventId}")
    public GroupEvent getEventById(@PathVariable Long eventId) {
        return eventService.getEventById(eventId);
    }

    @GetMapping("/{eventId}/is-attending/{username}")
    public ResponseEntity<Boolean> getEventIsAttending(@PathVariable Long eventId, @PathVariable String username) {
        return ResponseEntity.ok(eventService.isAttending(eventId, username));
    }

    @PostMapping("/{eventId}/attend/{username}")
    public void attendEvent(@PathVariable Long eventId, @PathVariable String username) {
        eventService.attendEvent(eventId, username);
    }

    @PostMapping("/{eventId}/remove-attending/{username}")
    public void removeAttending(@PathVariable Long eventId, @PathVariable String username) {
        eventService.removeAttending(eventId, username);
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
