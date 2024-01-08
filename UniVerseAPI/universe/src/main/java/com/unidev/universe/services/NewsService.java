package com.unidev.universe.services;

import com.unidev.universe.entities.News;
import com.unidev.universe.responses.NewsResponse;

import java.util.List;

public interface NewsService {
    List<NewsResponse> getAllNews();

    News getNewsByTitle(String newsTitle);

    News createNews(News news);

    News updateNews(Long newsId, News updatedNews);

    void deleteNews(Long newsId);
}
