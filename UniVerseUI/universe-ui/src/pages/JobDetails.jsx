import { useParams } from "react-router-dom"
import { useAuth } from "../hooks/useAuth";
import { IoBriefcase } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { HiBuildingOffice2 } from "react-icons/hi2";
import Loading from '../components/fallbacks/Loading'
import useJobData from "../hooks/useJobData";

const JobDetails = () => {
  const { jobId } = useParams();
  const { auth } = useAuth();

  const { 
    jobData, 
    isJobLoading,
    isJobError,
    jobError,
    applyToJobMutation,
    cancelApplicationToJobMutation
  } = useJobData(jobId, auth?.user);

  const handleApply = () =>{
    if(jobData.isApplied){
      cancelApplicationToJobMutation({jobId: jobId, username: auth?.user})
      return;
    }

    applyToJobMutation({jobId: jobId, username: auth?.user})
  }

  if(isJobError){
    throw Error(jobError);
  }

  if(isJobLoading){
    return <Loading/>
  }

  return (
    <div className="job-details-container">
      <div className="job-details">
        <h2>{jobData.job?.title}</h2>
        <h3>{jobData.job?.company}</h3>
        <span className="job-text-field"><HiBuildingOffice2 className="job-icon"/>{jobData.job?.requirements}</span>
        <span className="job-text-field"><FaLocationDot className="job-icon"/>{jobData.job?.location}</span>
        <span className="job-text-field"><IoBriefcase className="job-icon"/>{jobData.job?.type}</span>
        <p className="job-description">{jobData.job?.description}</p>
        <button 
        onClick={handleApply} 
        className="job-confirm-button">
          {jobData.isApplied ? "Cancel Application" : "Apply"}
        </button>
      </div>
    </div>
  )
}

export default JobDetails
