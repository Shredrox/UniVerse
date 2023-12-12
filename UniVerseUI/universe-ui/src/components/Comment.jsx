import { useMutation, useQuery } from "@tanstack/react-query";
import { addCommentReply, getCommentReplies } from "../api/postsApi";
import { useAuth } from '../hooks/useAuth'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from '../hooks/useSocket'

const Comment = ({comment, isReply}) => {
  const [commentText, setCommentText] = useState('');
  const [replyOn, setReplyOn] = useState(false);
  const { sendPrivateNotification } = useSocket();

  const navigate = useNavigate();

  const { auth } = useAuth();

  const {data: replies, isLoading, isError, error} = useQuery({ 
    queryKey: ["commentReplies", comment.id],
    queryFn: () => getCommentReplies(comment.id),
  });

  const {mutateAsync: addReplyMutation} = useMutation({
    mutationFn: addCommentReply,
    onSuccess: () =>{
      queryClient.invalidateQueries(["commentReplies", comment.id]);
    },
  });

  const handleReply = () =>{
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

  if(isError){
    return <div>{error.message}</div>
  }

  if(isLoading){
    return <div>Loading...</div>
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
          {replyOn ?
          <div className="comment-input"> 
            <button className="comment-cancel-button" onClick={() => setReplyOn(!replyOn)}>X</button>
            <textarea 
              type="text" 
              className="comment-textarea"
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
        {replies?.length > 0 &&
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
