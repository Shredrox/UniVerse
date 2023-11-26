import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Post } from './Post'
import { getPosts, addPost } from '../api/postsApi';
import { useState } from 'react';
import CreatePostForm from './CreatePostForm';

export const Feed = () => {
  const queryClient = useQueryClient();

  const {data: posts, isLoading, isError, error} = useQuery({ 
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });

  const {mutateAsync: addPostMutation} = useMutation({
    mutationFn: addPost,
    onSuccess: () =>{
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const [creatingPost, setCreatingPost] = useState(false);

  const createPost = async (title, content, image) =>{
    try{
      const data = new FormData();
      data.append('title', title);
      data.append('content', content);
      data.append('image', image);
      data.append('authorId', 2);
      console.log(data);

      const response = await addPostMutation(data);
      console.log(response);
    }catch(e){
      console.error(e.response);
    }
  }

  if(isError){
    return <div>{error.message}</div>
  }

  if(isLoading){
    return <div>Loading...</div>
  }

  return (
    <div className='feed-container'>
      <div className='feed-top'>
        {creatingPost ? "Creating Post" : "Feed"} 
        <button 
          className={creatingPost ? 'cancel-button' : 'confirm-button'} 
          onClick={() => setCreatingPost(!creatingPost)}>
            {creatingPost ? "Cancel" : "Create Post"}
        </button>
      </div>
      {creatingPost ? <CreatePostForm setCreatingPost={setCreatingPost} createPost={createPost}/> 
      :
      <div className='feed'>
        {posts?.map(post =>
          <div key={post.id} className='post-container'>
            <div className='line'>&nbsp;</div>
            <Post post={post}/>
          </div>
        )}
      </div>
      }
    </div>
  )
}
