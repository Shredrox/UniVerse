import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import { useAuth } from "../hooks/useAuth";
import { applyToJob, getJobById } from "../services/jobsService";
import { IoBriefcase } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { HiBuildingOffice2 } from "react-icons/hi2";
import Loading from '../components/fallbacks/Loading'

const JobDetails = () => {
  const { jobId } = useParams();
  const { auth } = useAuth();

  const {data: job, isLoading, isError, error} = useQuery({ 
    queryKey: ["job", jobId],
    queryFn: () => getJobById(jobId),
  });

  const {mutateAsync: applyToJobMutation} = useMutation({
    mutationFn: applyToJob,
  });

  if(isError){
    throw Error(error);
  }

  if(isLoading){
    return <Loading/>
  }

  return (
    <div className="job-details-container">
      <div className="job-details">
        <h2>{job?.title}</h2>
        <h3>{job?.company}</h3>
        <span className="job-text-field"><HiBuildingOffice2 className="job-icon"/>{job?.requirements}</span>
        <span className="job-text-field"><FaLocationDot className="job-icon"/>{job?.location}</span>
        <span className="job-text-field"><IoBriefcase className="job-icon"/>{job?.type}</span>
        <p className="job-description">{job?.description}</p>
        <button onClick={() => applyToJobMutation({jobId: job.id, username: auth?.user})} className="confirm-button">Apply</button>
      </div>
    </div>
  )
}

export default JobDetails
