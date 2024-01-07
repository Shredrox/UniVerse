package com.unidev.universe.services;

import com.unidev.universe.entities.GroupEvent;

import java.util.List;

public interface EventService {
    List<GroupEvent> getAllEvents();

    List<GroupEvent> getTrendingEvents();

    GroupEvent getEventById(Long eventId);

    boolean isAttending(Long eventId, String username);

    void attendEvent(Long eventId, String username);

    void removeAttending(Long eventId, String username);

    GroupEvent createEvent(GroupEvent event);

    GroupEvent updateEvent(Long eventId, GroupEvent updatedEvent);

    void deleteEvent(Long eventId);
}
