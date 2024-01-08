package com.unidev.universe.services.impl;

import com.unidev.universe.entities.News;
import com.unidev.universe.entities.Post;
import com.unidev.universe.repository.NewsRepository;
import com.unidev.universe.requests.NewsEditRequest;
import com.unidev.universe.responses.NewsResponse;
import com.unidev.universe.services.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
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

    public NewsResponse getNewsById(Long newsId) {
        Optional<News> optionalNews = newsRepository.findById(newsId);

        if (optionalNews.isPresent()) {
            News news = optionalNews.get();

            NewsResponse newsResponse = new NewsResponse();
            newsResponse.setId(news.getId());
            newsResponse.setTitle(news.getTitle());
            newsResponse.setContent(news.getContent());
            newsResponse.setDate(news.getDate());
            newsResponse.setPinned(news.getPinned());

            return newsResponse;
        }

        return null;
    }

    public byte[] getNewsImage(Long newsId){
        Optional<News> news = newsRepository.findById(newsId);
        return news.orElseThrow().getImageData();
    }

    public News createNews(News news) {
        return newsRepository.save(news);
    }

    public void updateNews(NewsEditRequest updatedNews) throws IOException {
        Optional<News> optionalNews = newsRepository.findById(updatedNews.getId());

        if (optionalNews.isPresent()) {
            News existingNews = optionalNews.get();
            existingNews.setTitle(updatedNews.getTitle());
            existingNews.setContent(updatedNews.getContent());
            existingNews.setImageData(updatedNews.getImage().getBytes());

            newsRepository.save(existingNews);
        }
    }

    public void deleteNews(Long newsId) {
        newsRepository.deleteById(newsId);
    }
}
