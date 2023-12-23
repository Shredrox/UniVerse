package com.unidev.universe.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unidev.universe.entities.News;
import com.unidev.universe.repository.NewsRepository;

import java.util.List;
import java.util.Optional;

@Service
public class NewsService {

    @Autowired
    private NewsRepository newsRepository;

    public List<News> getAllNews() {
        return newsRepository.findAll();
    }

    public News getNewsByTitle(String newsTitle) {
        Optional<News> optionalNews = newsRepository.findByTitle(newsTitle);
        return optionalNews.orElse(null);
    }

    //TODO: Authorization with logged users, only specific users can create, edit and delete events!
    public News createNews(News news) {
        return newsRepository.save(news);
    }

    //TODO: Authorization with logged users, only specific users can create, edit and delete events!
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

    //TODO: Authorization with logged users, only specific users can create, edit and delete events!
    public void deleteNews(Long newsId) {
        newsRepository.deleteById(newsId);
    }
}
