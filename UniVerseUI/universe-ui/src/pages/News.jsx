import { useQuery } from '@tanstack/react-query';
import { getNews } from '../api/newsApi';
import NewsCard from '../components/NewsCard'
import Loading from '../components/fallbacks/Loading'

const News = () => {
  const {data: news, isLoading, isError, error} = useQuery({ 
    queryKey: ["news"],
    queryFn: () => getNews(),
  });

  const sortedNews = news?.sort((a, b) => {
    if (a.pinned !== b.pinned) {
      return a.pinned ? -1 : 1;
    } else {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    }
  });

  if(isError){
    return <div>{error.message}</div>
  }

  return (
    <div className='news-container'>
      <h2>Latest News</h2>
      <div className='news-list'>
        {isLoading ? <Loading/> :
        sortedNews?.map((news, index) => (
          <NewsCard key={index} news={news}/>
        ))
        }
      </div>
    </div>
  )
}

export default News
