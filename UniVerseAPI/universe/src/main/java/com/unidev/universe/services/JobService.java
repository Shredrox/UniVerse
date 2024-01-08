package com.unidev.universe.services;

import com.unidev.universe.entities.JobOffer;

import java.util.List;
import java.util.Optional;

public interface JobService {
    List<JobOffer> getAllJobs();

    Optional<JobOffer> getJobById(Long id);

    boolean isAppliedToJob(Long jobId, String username);

    JobOffer createJob(JobOffer jobOffer);

    void applyToJob( Long jobId, String username);

    void cancelApplicationToJob(Long jobId, String username);

    JobOffer updateJob(Long id, JobOffer updatedJob);

    Boolean deleteJob(Long id);
}
