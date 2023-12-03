import { useNavigate } from "react-router-dom"
import { IoBriefcase } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { HiBuildingOffice2 } from "react-icons/hi2";

const JobOffer = ({job}) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/jobs/${job.id}`)} className="job-offer">
      <h3>{job.title}</h3>
      <h4>{job.company}</h4>
      <div className="job-offer-info">
        <span className="job-text-field"><HiBuildingOffice2 className="job-icon"/>{job?.requirements}</span>
        <span className="job-text-field"><FaLocationDot className="job-icon"/>{job?.location}</span>
        <span className="job-text-field"><IoBriefcase className="job-icon"/>{job?.type}</span>
      </div>
      {job.datePosted}
    </div>
  )
}

export default JobOffer
