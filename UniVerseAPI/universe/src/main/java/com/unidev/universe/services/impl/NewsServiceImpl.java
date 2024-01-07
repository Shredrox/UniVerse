package com.unidev.universe.services.impl;

import com.unidev.universe.entities.News;
import com.unidev.universe.repository.NewsRepository;
import com.unidev.universe.services.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NewsServiceImpl implements NewsService {
    private final NewsRepository newsRepository;

    public List<News> getAllNews() {
        return newsRepository.findAll();
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
