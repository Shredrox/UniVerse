import { useNavigate } from 'react-router-dom'
import HeartIcon from '../assets/icons/icon-heart.svg'
import CommentIcon from '../assets/icons/icon-comment.svg'

export const Post = ({post}) => {
  const navigate = useNavigate();

  return (
    <div className='post'>
      <div className='post-author'>
        <div className='author-profile-picture'></div>
        <span onClick={() => navigate(`/profile/${post.authorName}`)}>{post.authorName}</span>
      </div>
      <div className='post-content'>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        {post.image && <img src={post.image} alt='postImage'/>} 
      </div>
      <div className='interaction-container'>
        <img src={HeartIcon}/>
        Like
        <img src={CommentIcon}/>
        Comment
      </div>
    </div>
  )
}
