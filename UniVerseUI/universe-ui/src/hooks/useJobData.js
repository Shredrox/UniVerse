import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applyToJob, cancelApplicationToJob, deleteJob, getIsAppliedToJob, getJobById } from "../services/jobsService";

const useJobData = (jobId, user) =>{
  const queryClient = useQueryClient();

  const {data: job, 
    isLoading: isJobDetailsLoading, 
    isError: isJobDetailsError, 
    error: jobDetailsError
  } = useQuery({ 
    queryKey: ["job", jobId],
    queryFn: () => getJobById(jobId),
  });

  const {data: isApplied, 
    isLoading: isAppliedLoading, 
    isError: isAppliedError, 
    error: appliedError
  } = useQuery({ 
    queryKey: ["jobIsApplied", jobId, user],
    queryFn: () => getIsAppliedToJob(jobId, user),
  });

  const {mutateAsync: applyToJobMutation} = useMutation({
    mutationFn: applyToJob,
    onSuccess: () =>{
      queryClient.invalidateQueries(["jobIsApplied", jobId, user]);
    },
  });

  const {mutateAsync: cancelApplicationToJobMutation} = useMutation({
    mutationFn: cancelApplicationToJob,
    onSuccess: () =>{
      queryClient.invalidateQueries(["jobIsApplied", jobId, user]);
    },
  });

  const {mutateAsync: deleteJobMutation} = useMutation({
    mutationFn: deleteJob,
    onSuccess: () =>{
      queryClient.invalidateQueries(["jobOffers"]);
    },
  });

  const isJobError =  isJobDetailsError || isAppliedError;
  const jobError = jobDetailsError || appliedError;
  const isJobLoading = isJobDetailsLoading || isAppliedLoading;

  return {
    jobData: {job, isApplied}, 
    isJobLoading, 
    isJobError, 
    jobError,
    applyToJobMutation,
    cancelApplicationToJobMutation,
    deleteJobMutation
  }
}

export default useJobData
