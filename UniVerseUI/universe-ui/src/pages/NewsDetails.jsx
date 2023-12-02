import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import { getNewsByTitle } from "../api/newsApi";

const NewsDetails = () => {
  const {data: news, isLoading, isError, error} = useQuery({ 
    queryKey: ["newsDetails"],
    queryFn: () => getNewsByTitle(newsTitle),
  });

  const { newsTitle } = useParams();

  if(isError){
    return <div>{error.message}</div>
  }

  if(isLoading){
    return <div>Loading...</div>
  }

  return (
    <div className="news-details-container">
      {news.image && 
      <div className="news-details-image-container">
        <img src={news.image} alt="NewsImage" />
      </div>
      }
      <h4>{news.title}</h4>
      {news.date}
      <p>{news.text}</p>
    </div>
  )
}

export default NewsDetails
