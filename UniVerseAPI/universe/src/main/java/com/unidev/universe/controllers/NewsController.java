package com.unidev.universe.controllers;

import com.unidev.universe.dto.NewsDTO;
import com.unidev.universe.requests.NewsEditRequest;
import com.unidev.universe.responses.NewsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.unidev.universe.entities.News;
import com.unidev.universe.services.NewsService;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/news")
public class NewsController {
    private final NewsService newsService;

    @GetMapping
    public List<NewsResponse> getAllNews() {
        return newsService.getAllNews();
    }

    @GetMapping("/{newsId}")
    public NewsResponse getNewsById(@PathVariable Long newsId) {
        return newsService.getNewsById(newsId);
    }

    @GetMapping("/{newsId}/image")
    public ResponseEntity<byte[]> getNewsImage(@PathVariable Long newsId) {
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(newsService.getNewsImage(newsId));
    }

    @PostMapping("/createNews")
    public ResponseEntity<News> createNews(@ModelAttribute NewsDTO news) throws IOException {
        News createdNews = newsService.createNews(news);
        return new ResponseEntity<>(createdNews, HttpStatus.CREATED);
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateNews(@ModelAttribute NewsEditRequest updatedNews) throws IOException {
        newsService.updateNews(updatedNews);

        return ResponseEntity.ok("News updated.");
    }

    @DeleteMapping("/delete/{newsId}")
    public ResponseEntity<Void> deleteNews(@PathVariable Long newsId) {
        newsService.deleteNews(newsId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
