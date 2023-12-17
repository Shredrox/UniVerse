package com.unidev.universe.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unidev.universe.repository.EventRepository;
import com.unidev.universe.entities.GroupEvent;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<GroupEvent> getAllEvents() {
        return eventRepository.findAll();
    }

    public GroupEvent getEventById(Long eventId) {
        Optional<GroupEvent> optionalEvent = eventRepository.findById(eventId);
        return optionalEvent.orElse(null);
    }

    //TODO: Authorization with logged users, only specific users can create, edit and delete events!
    public GroupEvent createEvent(GroupEvent event) {
        return eventRepository.save(event);
    }

    //TODO: Authorization with logged users, only specific users can create, edit and delete events!
    public GroupEvent updateEvent(Long eventId, GroupEvent updatedEvent) {
        Optional<GroupEvent> optionalEvent = eventRepository.findById(eventId);

        if (optionalEvent.isPresent()) {
            GroupEvent existingEvent = optionalEvent.get();
            existingEvent.setTitle(updatedEvent.getTitle());
            existingEvent.setDescription(updatedEvent.getDescription());
            existingEvent.setDate(updatedEvent.getDate());
            return eventRepository.save(existingEvent);
        } else {
            return null; 
        }
    }

    //TODO: Authorization with logged users, only specific users can create, edit and delete events!
    public void deleteEvent(Long eventId) {
        eventRepository.deleteById(eventId);
    }
}
