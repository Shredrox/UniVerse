import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addPostComment, getPostComments } from "../api/postsApi";
import Comment from "./Comment";
import { useState } from "react";
import { useAuth } from '../hooks/useAuth'

const CommentSection = ({postId}) => {
  const [commentText, setCommentText] = useState('');

  const { auth } = useAuth();

  const queryClient = useQueryClient();

  const {data: comments} = useQuery({ 
    queryKey: ["postComments", postId],
    queryFn: () => getPostComments(postId),
  });

  const {mutateAsync: addCommentMutation} = useMutation({
    mutationFn: addPostComment,
    onSuccess: () =>{
      queryClient.invalidateQueries(["postComments", postId]);
    },
  });

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
          onClick={() => {
            addCommentMutation({postId: postId, username: auth?.user, content: commentText}); 
            setCommentText('');}}>
              Comment
        </button>
      </div>
      <div className="comments-list">
      {comments?.map((comment, index) =>
        <Comment key={index} comment={comment} isReply={false}/>
      )}
      </div>
    </div>
  )
}

export default CommentSection
