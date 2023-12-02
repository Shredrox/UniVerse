import { useNavigate } from "react-router-dom"

const JobOffer = ({job}) => {
  const navigate = useNavigate();

  return (
    <div className="job-offer">
      <h3>{job.title}</h3>
      <h4>{job.requirements}</h4>
      <h4>{job.location}</h4>
      {job.type}
    </div>
  )
}

export default JobOffer
