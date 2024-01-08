import Post from './Post'
import { useState } from 'react';
import CreatePostForm from './CreatePostForm';
import { useAuth } from '../hooks/useAuth'
import Loading from '../components/fallbacks/Loading'
import useFeedData from '../hooks/useFeedData';

const Feed = () => {
  const { auth } = useAuth();

  const { 
    posts,
    isPostsLoading,
    isPostsError,
    postsError,
    addPostMutation 
  } = useFeedData(auth?.user);

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

  if(isPostsError){
    throw Error(postsError);
  }

  if(isPostsLoading){
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
