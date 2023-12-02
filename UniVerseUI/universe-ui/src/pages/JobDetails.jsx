import { useParams } from "react-router-dom"

const JobDetails = () => {
  const { jobId } = useParams();

  return (
    <div>JobOfferDetails</div>
  )
}

export default JobDetails
