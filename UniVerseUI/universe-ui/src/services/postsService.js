import axios from "../api/axios";

//posts--------------------------
export const getAllPosts = async () =>{
    const response = await axios.get(`/posts`);
    return response.data;
}

export const getFriendsPosts = async (username) =>{
    const response = await axios.get(`/posts/getFriendsPosts/${username}`);
    return response.data;
}

export const getUserPostsCount = async (username) =>{
    const response = await axios.get(`/posts/user/${username}/count`);
    return response.data;
}

export const getPostById = async (postId) =>{
    const response = await axios.get(`/posts/${postId}`);
    return response.data;
}

export const getPostImage = async (id) =>{
    const response = await axios.get(`/posts/${id}/image`, { responseType: 'blob'});
    return response.data;
}

export const addPost = async (post) =>{
    return await axios.post('/posts/createPost', post, { responseType: 'blob'});
}

export const updatePost = async (post) =>{
    return await axios.put(`/posts/${post.id}`, post);
}

export const deletePost = async (postId) =>{
    return await axios.delete(`/posts/${postId}`);
}

//comments-----------------------
export const getPostComments = async (postId) =>{
    const response = await axios.get(`/comments/${postId}/getComments`);
    return response.data;
}

export const getCommentReplies = async (commentId) =>{
    const response = await axios.get(`/comments/${commentId}/replies`);
    return response.data;
}

export const getPostCommentCount = async (postId) =>{
    const response = await axios.get(`/comments/${postId}/getCommentsCount`);
    return response.data;
}

export const addPostComment = async ({postId, username, content}) =>{
    const commentRequest = {
        postId: postId,
        username: username,
        content: content
    }

    const response = await axios.post(`/comments/addComment`, commentRequest);
    return response.data;
}

export const addCommentReply = async ({commentId, username, content}) => {
    const commentRequest = {
        postId: "",
        username: username,
        content: content
    }

    const response = await axios.post(`/comments/${commentId}/addReply`, commentRequest);
    return response.data;
}

//likes--------------------------
export const getPostLikes = async (postId) =>{
    const response = await axios.get(`/likes/post/${postId}/getLikes`);
    return response.data;
}

export const getIsLiked = async (postId, username) =>{
    const response = await axios.get(`/likes/post/${postId}/likedBy/${username}`);
    return response.data;
}

export const likePost = async (like) =>{
    const response = await axios.post(`/likes/post/like`, like);
    return response.data;
}

export const unlikePost = async ({postId, username}) =>{
    const response = await axios.delete(`/likes/post/${postId}/unlike`, {
        params: {
          username
        }
    });
    
    return response.data;
}
