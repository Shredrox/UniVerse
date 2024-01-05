import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Post from './Post'
import { addPost, getFriendsPosts } from '../services/postsService';
import { useState } from 'react';
import CreatePostForm from './CreatePostForm';
import { useAuth } from '../hooks/useAuth'
import Loading from '../components/fallbacks/Loading'

const Feed = () => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  const {data: posts, isLoading, isError, error} = useQuery({ 
    queryKey: ["posts", auth?.user],
    queryFn: () => getFriendsPosts(auth?.user),
  });

  const {mutateAsync: addPostMutation} = useMutation({
    mutationFn: addPost,
    onSuccess: () =>{
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const [creatingPost, setCreatingPost] = useState(false);

  const createPost = async (data) =>{
    try{
      const requestData = new FormData();
      requestData.append('title', data.title);
      requestData.append('content', data.content);
      requestData.append('image', data.image[0]);
      requestData.append('authorName', auth?.user);

      await addPostMutation(requestData);
    }catch(e){
      console.error(e.response);
    }
  }

  if(isError){
    throw Error(error);
  }

  if(isLoading){
    return <Loading/>
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
      {posts.length > 0 ?
      posts?.map(post =>
        <Post key={post.id} post={post}/>
      )
      : 
      <div>No posts yet.</div>
      }
      </div>
      }
    </div>
  )
}

export default Feed
