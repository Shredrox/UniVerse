package com.unidev.universe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.unidev.universe.entities.News;

import java.util.Optional;

public interface NewsRepository extends JpaRepository<News, Long> {
    Optional<News> findByTitle(String title);
}
