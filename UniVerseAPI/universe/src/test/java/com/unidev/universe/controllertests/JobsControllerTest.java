package com.unidev.universe.controllertests;

import com.unidev.universe.controllers.JobsController;
import com.unidev.universe.entities.JobOffer;
import com.unidev.universe.services.JobService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@AutoConfigureMockMvc(addFilters = false)
class JobsControllerTest {

    @Mock
    private JobService jobService;

    @InjectMocks
    private JobsController jobsController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateJob() {
        JobOffer jobOffer = new JobOffer();
        when(jobService.createJob(jobOffer)).thenReturn(jobOffer);

        ResponseEntity<JobOffer> response = jobsController.createJob(jobOffer);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(jobOffer, response.getBody());
        verify(jobService, times(1)).createJob(jobOffer);
    }

    @Test
    void testApplyToJob() {
        Long jobId = 1L;
        String username = "testUser";

        jobsController.applyToJob(jobId, username);

        verify(jobService, times(1)).applyToJob(jobId, username);
    }

    @Test
    void testCancelApplicationToJob() {
        Long jobId = 1L;
        String username = "testUser";

        jobsController.cancelApplicationToJob(jobId, username);

        verify(jobService, times(1)).cancelApplicationToJob(jobId, username);
    }

    @Test
    void testUpdateJob() {
        Long jobId = 1L;
        JobOffer updatedJob = new JobOffer();
        when(jobService.updateJob(jobId, updatedJob)).thenReturn(updatedJob);

        ResponseEntity<JobOffer> response = jobsController.updateJob(jobId, updatedJob);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedJob, response.getBody());
        verify(jobService, times(1)).updateJob(jobId, updatedJob);
    }

    @Test
    void testDeleteJob_ValidId() {
        Long jobId = 1L;
        when(jobService.deleteJob(jobId)).thenReturn(true);

        ResponseEntity<Void> response = jobsController.deleteJob(jobId);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(jobService, times(1)).deleteJob(jobId);
    }

    @Test
    void testDeleteJob_InvalidId() {
        Long jobId = 1L;
        when(jobService.deleteJob(jobId)).thenReturn(false);

        ResponseEntity<Void> response = jobsController.deleteJob(jobId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(jobService, times(1)).deleteJob(jobId);
    }
}