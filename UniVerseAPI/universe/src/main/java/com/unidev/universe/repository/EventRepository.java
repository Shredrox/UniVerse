package com.unidev.universe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unidev.universe.entities.GroupEvent;

public interface EventRepository extends JpaRepository<GroupEvent, Long> {
    GroupEvent findById(int eventId);
}
