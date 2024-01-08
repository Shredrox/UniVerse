package com.unidev.universe.controllers;

import com.unidev.universe.responses.NewsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.unidev.universe.entities.News;
import com.unidev.universe.services.NewsService;

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

    @GetMapping("/{newsTitle}")
    public News getNewsById(@PathVariable String newsTitle) {
        return newsService.getNewsByTitle(newsTitle);
    }

    @PostMapping("/createNews")
    public ResponseEntity<News> createNews(@RequestBody News news) {
        News createdNews = newsService.createNews(news);
        return new ResponseEntity<>(createdNews, HttpStatus.CREATED);
    }

    @PatchMapping("/{newsId}")
    public ResponseEntity<News> updateNews(@PathVariable Long newsId, @RequestBody News updatedNews) {
        News result = newsService.updateNews(newsId, updatedNews);

        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{newsId}")
    public ResponseEntity<Void> deleteNews(@PathVariable Long newsId) {
        newsService.deleteNews(newsId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
