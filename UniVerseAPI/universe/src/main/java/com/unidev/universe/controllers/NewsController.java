package com.unidev.universe.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import com.unidev.universe.entities.News;
import com.unidev.universe.services.NewsService;

import java.util.List;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    @Autowired
    private NewsService newsService;

    @GetMapping
    public List<News> getAllNews() {
        return newsService.getAllNews();
    }

    @GetMapping("/{newsId}")
    public News getNewsById(@PathVariable Long newsId) {
        return newsService.getNewsById(newsId);
    }

    @PostMapping
    public ResponseEntity<News> createNews(@RequestBody News news) {
        News createdNews = newsService.createNews(news);
        return new ResponseEntity<>(createdNews, HttpStatus.CREATED);
    }

    //TODO: Authorization with logged users, only specific users can create, edit and delete events!
    public ResponseEntity<News> updateNews(@PathVariable Long newsId, @RequestBody News updatedNews) {
        News result = newsService.updateNews(newsId, updatedNews);

        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //TODO: Authorization with logged users, only specific users can create, edit and delete events!
    public ResponseEntity<Void> deleteNews(@PathVariable Long newsId) {
        newsService.deleteNews(newsId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
