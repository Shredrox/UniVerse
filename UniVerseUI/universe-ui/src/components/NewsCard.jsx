import { useNavigate } from 'react-router-dom'
import PinnedIcon from '../assets/icons/icon-pinned.svg'
import useNewsImage from '../hooks/useNewsImage';

const NewsCard = ({news}) => {
  const navigate = useNavigate();

  const { newsImage } = useNewsImage(news.id);

  return (
    <div onClick={() => navigate(`/news/${news.id}`)} className={`news-card ${news.pinned ? 'news-card-pinned' : ''}`}>
      <div className='news-image-container'>
      {newsImage?.size > 0 && 
      <img src={URL.createObjectURL(newsImage)} alt='NewsImage'/> 
      }
      </div>
      <div className="news-content-container">
        <h3 className="news-text">{news.title}</h3> 
        <label>{news.date}</label>
      </div>
      <div>
        {news.pinned && <img src={PinnedIcon} alt="PinnedIcon" />}
      </div>
    </div>
  )
}

export default NewsCard
