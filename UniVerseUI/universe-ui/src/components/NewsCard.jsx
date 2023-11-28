import { useNavigate } from 'react-router-dom'
import PinnedIcon from '../assets/icons/icon-pinned.svg'

const NewsCard = ({news}) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/news/${news.title}`)} className={`news-card ${news.pinned ? 'news-card-pinned' : ''}`}>
      <div className='news-image-container'>
        {news.image && <img src={news.image} alt="NewsImage" />}
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
