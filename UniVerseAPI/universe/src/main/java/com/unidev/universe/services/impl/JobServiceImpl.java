package com.unidev.universe.services.impl;

import com.unidev.universe.entities.JobOffer;
import com.unidev.universe.entities.User;
import com.unidev.universe.repository.JobRepository;
import com.unidev.universe.repository.UserRepository;
import com.unidev.universe.services.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public List<JobOffer> getAllJobs(){
        return jobRepository.findAll();
    }

    public Optional<JobOffer> getJobById(Long id){
        return jobRepository.findById(id);
    }

    public boolean isAppliedToJob(Long jobId, String username){
        Optional<JobOffer> optionalJobOffer = jobRepository.findById(jobId);
        User user = userRepository.findByUsername(username);

        if (user != null && optionalJobOffer.isPresent()) {
            JobOffer jobOffer = optionalJobOffer.get();

            for (User applicant: jobOffer.getApplicants()) {
                if(Objects.equals(applicant, user)){
                    return true;
                }
            }
        }

        return false;
    }

    public JobOffer createJob(JobOffer jobOffer){
        return jobRepository.save(jobOffer);
    }

    public void applyToJob( Long jobId, String username){
        User applicant = userRepository.findByUsername(username);
        Optional<JobOffer> optionalJobOffer = jobRepository.findById(jobId);
        if (applicant != null && optionalJobOffer.isPresent()) {
            JobOffer jobOffer = optionalJobOffer.get();
            jobOffer.getApplicants().add(applicant);
            jobRepository.save(jobOffer);
        }
    }

    public void cancelApplicationToJob(Long jobId, String username){
        User applicant = userRepository.findByUsername(username);
        Optional<JobOffer> optionalJobOffer = jobRepository.findById(jobId);
        if (applicant != null && optionalJobOffer.isPresent()) {
            JobOffer jobOffer = optionalJobOffer.get();
            jobOffer.getApplicants().remove(applicant);
            jobRepository.save(jobOffer);
        }
    }

    public JobOffer updateJob(Long id, JobOffer updatedJob){
        if(jobRepository.existsById(id)){
            updatedJob.setId(id);
            return jobRepository.save(updatedJob);
        }
        return null;
    }

    public Boolean deleteJob(Long id){
        if(jobRepository.existsById(id)){
            jobRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
