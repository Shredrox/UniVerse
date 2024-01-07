package com.unidev.universe.services;

import com.unidev.universe.entities.News;

import java.util.List;

public interface NewsService {
    List<News> getAllNews();

    News getNewsByTitle(String newsTitle);

    News createNews(News news);

    News updateNews(Long newsId, News updatedNews);

    void deleteNews(Long newsId);
}
