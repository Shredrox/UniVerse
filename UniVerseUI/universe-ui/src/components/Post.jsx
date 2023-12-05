import { useNavigate } from 'react-router-dom'
import CommentIcon from '../assets/icons/icon-comment.svg'
import { FaRegHeart, FaHeart  } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getIsLiked, getPostCommentCount, getPostLikes, likePost, unlikePost } from '../api/postsApi';
import { useAuth } from '../hooks/useAuth'
import CommentSection from './CommentSection';
import { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Post = ({post}) => {
  const [isCommentSectionOn, setIsCommentSectionOn] = useState(false);

  const navigate = useNavigate();
  const { auth } = useAuth();

  const queryClient = useQueryClient();

  const {data: postLikes} = useQuery({ 
    queryKey: ["postLikes", post.id],
    queryFn: () => getPostLikes(post.id),
  });

  const {data: postCommentCount} = useQuery({ 
    queryKey: ["postCommentCount", post.id],
    queryFn: () => getPostCommentCount(post.id),
  });

  const {data: isLiked, isLoading, isError, error} = useQuery({ 
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

  const toggleComment = () =>{
    setIsCommentSectionOn(!isCommentSectionOn);
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
            <FaHeart onClick={() => likePostMutation({postId: post.id, username: auth?.user})} className='interaction-icon'/>
            :
            <FaRegHeart onClick={() => unlikePostMutation({postId: post.id, username: auth?.user})} className='interaction-icon'/>
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
      {isCommentSectionOn && <CommentSection postId={post.id}/>}
    </div>
  )
}

export default Post
