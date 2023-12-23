import { useNavigate } from 'react-router-dom'
import CommentIcon from '../assets/icons/icon-comment.svg'
import { FaRegHeart, FaHeart  } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getIsLiked, getPostCommentCount, getPostLikes, likePost, unlikePost } from '../services/postsService';
import { useAuth } from '../hooks/useAuth'
import { useSocket } from '../hooks/useSocket'
import CommentSection from './CommentSection';
import { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Loading from '../components/fallbacks/Loading'
import ErrorFallback from './fallbacks/ErrorFallback';

const Post = ({post}) => {
  const [isCommentSectionOn, setIsCommentSectionOn] = useState(false);

  const navigate = useNavigate();
  const { auth } = useAuth();
  const { sendPrivateNotification } = useSocket();

  const queryClient = useQueryClient();

  const {data: postLikes, isLoading: likesLoading, isError: isLikesError, error: likesError} = useQuery({ 
    queryKey: ["postLikes", post.id],
    queryFn: () => getPostLikes(post.id),
  });

  const {data: postCommentCount, isLoading: commentCountLoading, isError: isCommentsError, error: commentsError} = useQuery({ 
    queryKey: ["postCommentCount", post.id],
    queryFn: () => getPostCommentCount(post.id),
  });

  const {data: isLiked, isLoading: postLikedLoading, isError: isLikedError, error: likedError} = useQuery({ 
    queryKey: ["postLiked", post.id, auth?.user],
    queryFn: () => getIsLiked(post.id, auth?.user),
  });

  const {mutateAsync: likePostMutation} = useMutation({
    mutationFn: likePost,
    onSuccess: () =>{
      queryClient.invalidateQueries(["postLikes", post.id]);
    },
  });

  const {mutateAsync: unlikePostMutation} = useMutation({
    mutationFn: unlikePost,
    onSuccess: () =>{
      queryClient.invalidateQueries(["postLikes", post.id]);
    },
  });

  const handleLike = () => {
    likePostMutation({postId: post.id, username: auth?.user});
    sendPrivateNotification(
      { 
        message: `${auth?.user} liked your post!`, 
        type: "Like", 
        source: "Feed", 
        recipientName: post.authorName 
      }
    );
  }

  const handleUnike = () => {
    unlikePostMutation({postId: post.id, username: auth?.user});
  }

  const toggleComment = () =>{
    setIsCommentSectionOn(!isCommentSectionOn);
  }

  if(isLikedError || isLikesError || isCommentsError){
    let error;

    if(isLikedError){
      error = likedError.message;
    }else if(isLikesError){
      error = likesError.message;
    }else{
      error = commentsError.message;
    }

    return <ErrorFallback error={error}/>
  }

  if(likesLoading || commentCountLoading || postLikedLoading){
    return <Loading/>
  }

  return (
    <div className='post-container'>
      <div className='line'>&nbsp;</div>
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
          <span>
            {isLiked ? 
            <FaHeart onClick={handleUnike} className='interaction-icon'/>
            :
            <FaRegHeart onClick={handleLike} className='interaction-icon'/>
            }
            {postLikes}
          </span>
          <span style={{cursor: "pointer", userSelect: "none"}} onClick={toggleComment} >
            <img className='interaction-icon' src={CommentIcon}/>
            {postCommentCount} Comments {isCommentSectionOn ? 
            <IoIosArrowDown className='arrow-icon-down'/> 
            : 
            <IoIosArrowForward className='arrow-icon-forward'/>}
          </span>
        </div>
      </div>
      {isCommentSectionOn && <CommentSection post={post}/>}
    </div>
  )
}

export default Post
