package com.unidev.universe.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.unidev.universe.entities.News;

public interface NewsRepository extends JpaRepository<News, Long> {
    News findById(int newsId);
}
