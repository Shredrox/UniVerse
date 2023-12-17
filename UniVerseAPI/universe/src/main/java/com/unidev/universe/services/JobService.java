package com.unidev.universe.services;

import com.unidev.universe.entities.JobOffer;
import com.unidev.universe.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {
    @Autowired
    private JobRepository jobRepository;

    public List<JobOffer> getAllJobs(){
        return jobRepository.findAll();
    }

    public Optional<JobOffer> getJobById(Long id){
        return jobRepository.findById(id);
    }
}
