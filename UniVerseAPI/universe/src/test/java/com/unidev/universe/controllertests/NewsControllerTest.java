package com.unidev.universe.controllertests;

import com.unidev.universe.controllers.NewsController;
import com.unidev.universe.dto.NewsDTO;
import com.unidev.universe.entities.News;
import com.unidev.universe.requests.NewsEditRequest;
import com.unidev.universe.responses.NewsResponse;
import com.unidev.universe.services.NewsService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
class NewsControllerTest {

    @Mock
    private NewsService newsService;

    @InjectMocks
    private NewsController newsController;

    @Test
    void testGetAllNews() {
        List<NewsResponse> mockNewsList = Collections.singletonList(new NewsResponse());
        when(newsService.getAllNews()).thenReturn(mockNewsList);

        List<NewsResponse> result = newsController.getAllNews();

        assertEquals(mockNewsList, result);
    }

    @Test
    void testGetNewsById() {
        NewsResponse mockNewsResponse = new NewsResponse();
        when(newsService.getNewsById(anyLong())).thenReturn(mockNewsResponse);

        NewsResponse result = newsController.getNewsById(1L);

        assertEquals(mockNewsResponse, result);
        verify(newsService, times(1)).getNewsById(1L);
    }

    @Test
    void testCreateNews() throws IOException {
        NewsDTO newsDTO = new NewsDTO();
        News mockCreatedNews = new News();
        when(newsService.createNews(newsDTO)).thenReturn(mockCreatedNews);

        ResponseEntity<News> result = newsController.createNews(newsDTO);

        assertEquals(HttpStatus.CREATED, result.getStatusCode());
        assertEquals(mockCreatedNews, result.getBody());
        // Verifying that the newsService method was called with the correct parameter
        verify(newsService, times(1)).createNews(newsDTO);
    }
}
