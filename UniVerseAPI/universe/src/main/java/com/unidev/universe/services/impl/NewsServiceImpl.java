package com.unidev.universe.services.impl;

import com.unidev.universe.dto.NewsDTO;
import com.unidev.universe.entities.News;
import com.unidev.universe.repository.NewsRepository;
import com.unidev.universe.requests.NewsEditRequest;
import com.unidev.universe.responses.NewsResponse;
import com.unidev.universe.services.NewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
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

    public News createNews(NewsDTO request) throws IOException {
        News news = new News();
        news.setTitle(request.getTitle());
        news.setContent(request.getContent());
        news.setPinned(request.getPinned());
        news.setDate(LocalDateTime.now());

        if(request.getImage() != null){
            news.setImageData(request.getImage().getBytes());
        }

        return newsRepository.save(news);
    }

    public void updateNews(NewsEditRequest updatedNews) throws IOException {
        Optional<News> optionalNews = newsRepository.findById(updatedNews.getId());

        if (optionalNews.isPresent()) {
            News existingNews = optionalNews.get();

            if(!updatedNews.getTitle().isEmpty()){
                existingNews.setTitle(updatedNews.getTitle());
            }
            if(!updatedNews.getContent().isEmpty()){
                existingNews.setContent(updatedNews.getContent());
            }
            if(updatedNews.getImage() != null){
                existingNews.setImageData(updatedNews.getImage().getBytes());
            }

            existingNews.setPinned(updatedNews.getPinned());
            newsRepository.save(existingNews);
        }
    }

    @Transactional
    public void deleteNews(Long newsId) {
        newsRepository.deleteById(newsId);
    }
}
