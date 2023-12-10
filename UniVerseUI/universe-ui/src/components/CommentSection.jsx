import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addPostComment, getPostComments } from "../api/postsApi";
import Comment from "./Comment";
import { useState } from "react";
import { useAuth } from '../hooks/useAuth'
import { useSocket } from '../hooks/useSocket'

const CommentSection = ({post}) => {
  const [commentText, setCommentText] = useState('');
  const { sendPrivateNotification } = useSocket();

  const { auth } = useAuth();

  const queryClient = useQueryClient();

  const {data: comments} = useQuery({ 
    queryKey: ["postComments", post.id],
    queryFn: () => getPostComments(post.id),
  });

  const {mutateAsync: addCommentMutation} = useMutation({
    mutationFn: addPostComment,
    onSuccess: () =>{
      queryClient.invalidateQueries(["postComments", post.id]);
    },
  });

  const handleAddComment = () =>{
    addCommentMutation({postId: post.id, username: auth?.user, content: commentText});
    sendPrivateNotification(
      { 
        message: `${auth?.user} commented on your post: "${commentText}"`, 
        type: "Comment", 
        source: "Feed", 
        recipientName: post.authorName
      }
    ); 
    setCommentText('');
  }

  return (
    <div className="comment-section">
      <div className="comment-input">
        <textarea 
          type="text" 
          className="comment-textarea"
          value={commentText} 
          onChange={(e) => setCommentText(e.target.value)} 
          placeholder='Comment...'
        />
        <button 
          className="comment-button"
          onClick={handleAddComment}>
            Comment
        </button>
      </div>
      <div className="comments-list">
      {comments?.length > 0 ? 
      comments?.map((comment, index) =>
        <Comment key={index} comment={comment} isReply={false}/>
      )
      :
        <div>No Comments.</div>
      }
      </div>
    </div>
  )
}

export default CommentSection
