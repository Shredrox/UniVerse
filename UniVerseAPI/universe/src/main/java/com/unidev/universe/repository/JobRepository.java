package com.unidev.universe.repository;

import com.unidev.universe.entities.JobOffer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<JobOffer, Long> {
    List<JobOffer> findByTitle(String title);

    List<JobOffer> findByDescriptionContaining(String keyword);

    List<JobOffer> findByTitleAndDescription(String title, String keyword);

    List<JobOffer> findByTitleIgnoreCase(String title);

    List<JobOffer> findByTitleContainingOrDescriptionContaining(String title, String description);
 }
