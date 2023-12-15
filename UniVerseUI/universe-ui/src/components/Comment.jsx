import { useMutation, useQuery } from "@tanstack/react-query";
import { addCommentReply, getCommentReplies } from "../api/postsApi";
import { useAuth } from '../hooks/useAuth'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from '../hooks/useSocket'
import Loading from '../components/fallbacks/Loading'
import ErrorFallback from '../components/fallbacks/ErrorFallback'

const Comment = ({comment, isReply}) => {
  const [commentText, setCommentText] = useState('');
  const [replyOn, setReplyOn] = useState(false);
  const { sendPrivateNotification } = useSocket();

  const navigate = useNavigate();

  const { auth } = useAuth();

  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');

  const {data: replies, isLoading} = useQuery({ 
    queryKey: ["commentReplies", comment.id],
    queryFn: () => getCommentReplies(comment.id),
  });

  const {mutateAsync: addReplyMutation} = useMutation({
    mutationFn: addCommentReply,
    onSuccess: () =>{
      queryClient.invalidateQueries(["commentReplies", comment.id]);
    },
  });

  useEffect(() => {
    setIsError(false);
    setError('');
  }, [commentText])

  const handleReply = () =>{
    if(commentText === ''){
      setIsError(true);
      setError('Comment cannot be empty');
      return;
    }

    addReplyMutation({commentId: comment.id, username: auth?.user});
    sendPrivateNotification(
      { 
        message: `${auth?.user} replied to your comment: "${commentText}"`, 
        type: "Reply", 
        source: "Feed", 
        recipientName: comment.author
      }
    ); 
    setCommentText('')
  }

  const handleCancel = () =>{
    setReplyOn(!replyOn);
    setError('');
    setIsError(false);
  }
  
  return (
    <div className={isReply ? "reply-container" : "comment-container"}>
      {isReply && <div className="vertical-line"/>}
      <div className={isReply ? "reply" : "comment"}>
        <div className={isReply ? "" : "comment-content"}>
          <div className='comment-author'>
            <div className='comment-profile-picture'></div>
            <span onClick={() => navigate(`/profile/${comment.author}`)}>{comment.author}</span>
          </div>
          <p className="comment-text">{comment.content}</p>
          <div className="reply-error">
            {isError && <ErrorFallback error={error}/>}
          </div>
          {replyOn ?
          <div className="comment-input"> 
            <button className="comment-cancel-button" onClick={handleCancel}>X</button>
            <textarea 
              type="text" 
              className={`comment-textarea ${isError ? 'input-error' : ''}`}
              value={commentText} 
              onChange={(e) => setCommentText(e.target.value)} 
              placeholder='...'
            />
            <button 
              className="comment-button" 
              onClick={handleReply}>
                Reply
            </button>
          </div>
          :
          <button onClick={() => setReplyOn(!replyOn)} className="comment-button">Reply</button>
          }
        </div>
        {isLoading ? <Loading/> :
        replies?.length > 0 &&
        <div className="replies-list">
        {replies?.map((reply, index) => 
         <Comment key={index} comment={reply} isReply={true}/>
        )}
        </div>
        }
      </div>
    </div>
  )
}

export default Comment
