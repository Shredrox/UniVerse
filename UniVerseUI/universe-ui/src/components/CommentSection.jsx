import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addPostComment, getPostComments } from "../api/postsApi";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import { useAuth } from '../hooks/useAuth'
import { useSocket } from '../hooks/useSocket'
import Loading from '../components/fallbacks/Loading'
import ErrorFallback from '../components/fallbacks/ErrorFallback'

const CommentSection = ({post}) => {
  const [commentText, setCommentText] = useState('');
  const { sendPrivateNotification } = useSocket();

  const { auth } = useAuth();

  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');

  const queryClient = useQueryClient();

  const {data: comments, isLoading, isError: isQueryError, error: queryError} = useQuery({ 
    queryKey: ["postComments", post.id],
    queryFn: () => getPostComments(post.id),
  });

  const {mutateAsync: addCommentMutation} = useMutation({
    mutationFn: addPostComment,
    onSuccess: () =>{
      queryClient.invalidateQueries(["postComments", post.id]);
    },
  });

  useEffect(() => {
    setIsError(false);
    setError('');
  }, [commentText])

  const handleAddComment = () =>{
    if(commentText === ''){
      setIsError(true);
      setError('Comment cannot be empty');
      return;
    }

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

  if(isLoading){
    return <Loading/>
  }

  if(isQueryError){
    return <ErrorFallback error={queryError.message}/>
  }

  return (
    <div className="comment-section">
      {isError && <ErrorFallback error={error}/>}
      <div className="comment-input">
        <textarea 
          type="text" 
          className={`comment-textarea ${isError ? 'input-error' : ''}`}
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
