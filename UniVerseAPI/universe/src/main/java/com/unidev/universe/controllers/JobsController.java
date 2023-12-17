package com.unidev.universe.controllers;

import com.unidev.universe.entities.JobOffer;
import com.unidev.universe.services.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/universe/jobs")
public class JobsController {
    @Autowired
    private JobService jobService;

    @GetMapping
    public List<JobOffer> getAllJobs(){
        return jobService.getAllJobs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobOffer> getJobById(@PathVariable Long id){
        Optional<JobOffer> job = jobService.getJobById(id);
        return job.map(ResponseEntity::ok).orElseGet(()->ResponseEntity.notFound().build());
    }
}
