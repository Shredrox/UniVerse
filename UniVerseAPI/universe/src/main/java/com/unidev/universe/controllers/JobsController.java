package com.unidev.universe.controllers;

import com.unidev.universe.entities.JobOffer;
import com.unidev.universe.services.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public ResponseEntity<JobOffer> createJob(@RequestBody JobOffer job){
        return ResponseEntity.ok(jobService.createJob(job));
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobOffer> updateJob(@PathVariable Long id, @RequestBody JobOffer updatedJob){
        JobOffer resultJob = jobService.updateJob(id, updatedJob);
        return resultJob != null ? ResponseEntity.ok(resultJob) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id){
        return jobService.deleteJob(id)?ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
