package com.unidev.universe.services.impl;

import com.unidev.universe.entities.GroupEvent;
import com.unidev.universe.entities.User;
import com.unidev.universe.repository.EventRepository;
import com.unidev.universe.repository.UserRepository;
import com.unidev.universe.services.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public List<GroupEvent> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<GroupEvent> getTrendingEvents() {
        List<GroupEvent> events = eventRepository.findAll();
        List<GroupEvent> trendingEvents = new ArrayList<>();

        for (GroupEvent event: events) {
            if(event.getAttendees().size() > 10){
                trendingEvents.add(event);
            }
        }

        return trendingEvents;
    }

    public GroupEvent getEventById(Long eventId) {
        Optional<GroupEvent> optionalEvent = eventRepository.findById(eventId);
        return optionalEvent.orElse(null);
    }

    public boolean isAttending(Long eventId, String username){
        Optional<GroupEvent> optionalEvent = eventRepository.findById(eventId);
        User user = userRepository.findByUsername(username);

        if (user != null && optionalEvent.isPresent()) {
            GroupEvent event = optionalEvent.get();

            for (User attendee: event.getAttendees()) {
                if(Objects.equals(attendee, user)){
                    return true;
                }
            }
        }

        return false;
    }

    public void attendEvent(Long eventId, String username) {
        User user = userRepository.findByUsername(username);
        Optional<GroupEvent> optionalEvent = eventRepository.findById(eventId);

        if(user != null && optionalEvent.isPresent()){
            GroupEvent event = optionalEvent.get();
            event.getAttendees().add(user);

            eventRepository.save(event);
        }
    }

    public void removeAttending(Long eventId, String username) {
        User user = userRepository.findByUsername(username);
        Optional<GroupEvent> optionalEvent = eventRepository.findById(eventId);

        if(user != null && optionalEvent.isPresent()){
            GroupEvent event = optionalEvent.get();
            event.getAttendees().remove(user);

            eventRepository.save(event);
        }
    }

    public GroupEvent createEvent(GroupEvent event) {
        return eventRepository.save(event);
    }

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

    @Transactional
    public void deleteEvent(Long eventId) {
        eventRepository.deleteById(eventId);
    }
}
