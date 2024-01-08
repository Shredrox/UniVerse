package com.unidev.universe.services;

import com.unidev.universe.entities.News;
import com.unidev.universe.requests.NewsEditRequest;
import com.unidev.universe.responses.NewsResponse;

import java.io.IOException;
import java.util.List;

public interface NewsService {
    List<NewsResponse> getAllNews();

    byte[] getNewsImage(Long newsId);

    NewsResponse getNewsById(Long newsId);

    News createNews(News news);

    void updateNews(NewsEditRequest updatedNews) throws IOException;

    void deleteNews(Long newsId);
}
