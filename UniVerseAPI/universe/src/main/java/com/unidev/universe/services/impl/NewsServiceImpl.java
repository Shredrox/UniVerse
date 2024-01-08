package com.unidev.universe.services.impl;

import com.unidev.universe.entities.News;
import com.unidev.universe.repository.NewsRepository;
import com.unidev.universe.responses.NewsResponse;
import com.unidev.universe.services.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NewsServiceImpl implements NewsService {
    private final NewsRepository newsRepository;

    public List<NewsResponse> getAllNews() {
        List<News> news = newsRepository.findAll();
        List<NewsResponse> newsResponses = new ArrayList<>();

        for (News newsItem: news) {
            NewsResponse newsResponse = new NewsResponse();
            newsResponse.setId(newsItem.getId());
            newsResponse.setTitle(newsItem.getTitle());
            newsResponse.setContent(newsItem.getContent());
            newsResponse.setDate(newsItem.getDate());
            newsResponse.setPinned(newsItem.getPinned());

            newsResponses.add(newsResponse);
        }

        return newsResponses;
    }

    public News getNewsByTitle(String newsTitle) {
        Optional<News> optionalNews = newsRepository.findByTitle(newsTitle);
        return optionalNews.orElse(null);
    }

    public News createNews(News news) {
        return newsRepository.save(news);
    }

    public News updateNews(Long newsId, News updatedNews) {
        Optional<News> optionalNews = newsRepository.findById(newsId);

        if (optionalNews.isPresent()) {
            News existingNews = optionalNews.get();
            existingNews.setTitle(updatedNews.getTitle());
            existingNews.setContent(updatedNews.getContent());
            return newsRepository.save(existingNews);
        } else {
            return null;
        }
    }

    public void deleteNews(Long newsId) {
        newsRepository.deleteById(newsId);
    }
}
